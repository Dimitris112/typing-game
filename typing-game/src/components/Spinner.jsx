import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Spinner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
