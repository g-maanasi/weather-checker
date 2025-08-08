"use client";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    background: {
      default: "#5FB2F1",
    },
    primary: {
      main: "#E4F6FF",
      contrastText: "#000000",
    },
    secondary: {
      main: "#005E95",
    },
  },
});

export const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    background: {
      default: "#1D1849",
    },
    primary: {
      main: "#6F68A9",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
  },
});
