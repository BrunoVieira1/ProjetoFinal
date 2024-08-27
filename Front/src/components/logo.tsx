import React from "react";
import logo from "../assets/logo.svg";
import Typography from "@mui/material/Typography";

function Logo() {
  return (
    <div className="flex items-center text-center gap-4">
      <img src={logo} className="mb-10" />
      <Typography variant="h1" gutterBottom>
        PUB
      </Typography>
    </div>
  );
}

export default Logo;
