import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import Spinner from "./components/Spinner";
import GameControls from "./components/GameControls";
import TypingDisplay from "./components/TypingDisplay";
import TypingInput from "./components/TypingInput";
import ProgressBar from "./components/ProgressBar";
import StatsDisplay from "./components/StatsDisplay";

// no worries - simple text / sentences
const DATA_URL = "/data.json";

function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [data, setData] = useState({ sentences: [], paragraphs: [] });
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("medium");
  const [darkMode, setDarkMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [paragraphMode, setParagraphMode] = useState(false);

  const [text, setText] = useState("");
  const [textQueue, setTextQueue] = useState([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore")) || 0
  );
  const [accuracy, setAccuracy] = useState(100);

  const timerId = useRef(null);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: darkMode ? "#121212" : "#fff8f0",
            paper: darkMode ? "#1d1d1d" : "#fff8f0",
          },
          text: {
            primary: darkMode ? "#e0e0e0" : "#3e2723",
          },
          primary: {
            main: darkMode ? "#bb86fc" : "#ff7043",
          },
          secondary: {
            main: darkMode ? "#03dac6" : "#ffab91",
          },
        },
      }),
    [darkMode]
  );

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setData({
          sentences: [
            "This is a fallback funny sentence.",
            "The quick brown fox jumps over the lazy dog.",
          ],
          paragraphs: [
            "This is a fallback paragraph for typing mode. It is longer and more challenging.",
          ],
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    return () => clearInterval(timerId.current);
  }, []);

  const calculateAccuracy = (inputVal, expected) => {
    if (!inputVal) return 100;
    const correctChars = inputVal
      .split("")
      .filter((c, i) => c === expected[i]).length;
    return Math.round((correctChars / expected.length) * 100);
  };

  const startGame = () => {
    setStarted(true);
    setInput("");
    setScore(0);

    const pool = paragraphMode ? data.paragraphs : data.sentences;
    if (pool.length === 0) {
      alert("Loading text data, please wait.");
      setStarted(false);
      return;
    }
    const shuffled = shuffleArray(pool);
    setTextQueue(shuffled);
    setText(shuffled[0]);

    switch (mode) {
      case "easy":
        setTime(65);
        break;
      case "medium":
        setTime(63);
        break;
      case "hard":
        setTime(60);
        break;
      case "speed":
        setTime(10);
        break;
      case "zen":
        setTime(0);
        break;
      case "hardcore":
        setTime(60);
        break;
      default:
        setTime(60);
    }

    timerId.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(timerId.current);
          endGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setStarted(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);

    const isCorrect = text.startsWith(val);
    setAccuracy(calculateAccuracy(val, text));

    if (isCorrect && val === text) {
      setScore((s) => s + 1);

      // Remove first element from queue
      setTextQueue((queue) => {
        const newQueue = queue.slice(1);

        // Refill queue if too small
        if (newQueue.length < 3) {
          const pool = paragraphMode ? data.paragraphs : data.sentences;
          const moreTexts = shuffleArray(pool);
          newQueue.push(...moreTexts);
        }

        setText(newQueue[0]);
        setInput("");
        return newQueue;
      });
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth="sm"
          sx={{
            mt: 4,
            minHeight: "100vh",
            bgcolor: darkMode ? "#121212" : "#fff8f0",
            color: darkMode ? "#ffffff" : "#3e2723",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          mt: 4,
          minHeight: "100vh",
          bgcolor: darkMode ? "#121212" : "#fff8f0",
          color: darkMode ? "#ffffff" : "#3e2723",
          transition: "background-color 0.3s, color 0.3s",
          "& *": {
            color: darkMode ? "#ffffff" : "#3e2723",
          },
        }}
      >
        <GameControls
          mode={mode}
          onModeChange={(e) => setMode(e.target.value)}
          paragraphMode={paragraphMode}
          onParagraphModeChange={(e) => setParagraphMode(e.target.checked)}
          darkMode={darkMode}
          onDarkModeChange={(e) => setDarkMode(e.target.checked)}
          soundOn={soundOn}
          onSoundToggle={(e) => setSoundOn(e.target.checked)}
          started={started}
          onStart={startGame}
          onEnd={endGame}
        />

        <TypingDisplay text={text} darkMode={darkMode} />

        <TypingInput
          input={input}
          onChange={handleInputChange}
          isCorrect={text.startsWith(input)}
          disabled={!started}
        />

        <ProgressBar progress={(score / 10) * 100 || 0} />

        <StatsDisplay
          time={time}
          score={score}
          highScore={highScore}
          accuracy={accuracy}
        />
      </Container>
    </ThemeProvider>
  );
}
