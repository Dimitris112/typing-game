import React from "react";
import { Box, Typography } from "@mui/material";

export default function StatsDisplay({ time, score, highScore, accuracy }) {
  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
      <Typography variant="body1">Time: {time}s</Typography>
      <Typography variant="body1">Score: {score}</Typography>
      <Typography variant="body1">High Score: {highScore}</Typography>
      <Typography variant="body1">Accuracy: {accuracy}%</Typography>
    </Box>
  );
}
