import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import { gsap } from "gsap";

export default function TypingInput({ input, onChange, isCorrect, disabled }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    if (isCorrect) {
      gsap.to(textareaRef.current, {
        borderColor: "#4caf50",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });
    } else {
      gsap.to(textareaRef.current, {
        borderColor: "#f44336",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });
    }
  }, [isCorrect]);

  return (
    <TextField
      inputRef={textareaRef}
      fullWidth
      multiline
      minRows={4}
      variant="outlined"
      placeholder="Start typing here..."
      value={input}
      onChange={onChange}
      disabled={disabled}
      sx={{
        mt: 2,
        borderColor: isCorrect ? "#1976d2" : "#f44336",
      }}
    />
  );
}
