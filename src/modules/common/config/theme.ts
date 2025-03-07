"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    background: {
      default: "#fafafa",
    },
  },
});

export default theme;
