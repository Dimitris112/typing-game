import React from "react";
import { Box } from "@mui/material";

export default function TypingDisplay({ text, darkMode }) {
  return (
    <Box
      sx={{
        fontSize: "1.2rem",
        fontFamily: "monospace",
        border: "1px solid",
        borderColor: darkMode ? "#ffffff" : "#3e2723",
        borderRadius: 1,
        p: 2,
        minHeight: "100px",
        color: darkMode ? "#ffffff" : "#3e2723",
        backgroundColor: darkMode ? "#1d1d1d" : "#fff8f0",
        whiteSpace: "pre-wrap",
      }}
    >
      {text}
    </Box>
  );
}
