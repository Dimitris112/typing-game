import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";

export default function GameControls({
  mode,
  onModeChange,
  paragraphMode,
  onParagraphModeChange,
  darkMode,
  onDarkModeChange,
  soundOn,
  onSoundToggle,
  started,
  onStart,
  onEnd,
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Game Mode</InputLabel>
        <Select
          value={mode}
          label="Game Mode"
          onChange={onModeChange}
          disabled={started}
        >
          <MenuItem value="easy">Easy (+5s bonus)</MenuItem>
          <MenuItem value="medium">Medium (+3s bonus)</MenuItem>
          <MenuItem value="hard">Hard (No bonus)</MenuItem>
          <MenuItem value="speed">Speed Mode (Start 10s)</MenuItem>
          <MenuItem value="zen">Zen Mode (No timer)</MenuItem>
          <MenuItem value="hardcore">Hardcore (Mistakes cost 2s)</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            checked={paragraphMode}
            onChange={onParagraphModeChange}
            disabled={started}
          />
        }
        label="Paragraph Mode"
      />

      <FormControlLabel
        control={<Switch checked={darkMode} onChange={onDarkModeChange} />}
        label="Dark Mode"
      />

      <FormControlLabel
        control={
          <Switch
            checked={soundOn}
            onChange={onSoundToggle}
            disabled={!started}
          />
        }
        label="Sound Effects"
      />

      {!started ? (
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onStart}
        >
          Start Game
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="large"
          fullWidth
          color="error"
          sx={{ mt: 2 }}
          onClick={onEnd}
        >
          End Game
        </Button>
      )}
    </Box>
  );
}
