import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

export default function SoundToggle({ soundOn, onToggle, disabled }) {
  return (
    <FormControlLabel
      control={
        <Switch checked={soundOn} onChange={onToggle} disabled={disabled} />
      }
      label="Sound Effects"
    />
  );
}
