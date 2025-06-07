import React from "react";
import { LinearProgress, Box } from "@mui/material";

export default function ProgressBar({ progress }) {
  return (
    <Box sx={{ mt: 1 }}>
      <LinearProgress
        variant="determinate"
        value={Math.min(progress, 100)}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
}
