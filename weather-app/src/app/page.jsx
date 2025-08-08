"use client";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import { useThemeStore } from "./states";
import Search from "./search";
import Weather from "./weather";
import { useEffect } from "react";

export default function Home() {
  const theme = useThemeStore((state) => state.theme);
  const changeTheme = useThemeStore((state) => state.changeTheme);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDarkMode) {
      changeTheme();
    }
  }, [changeTheme]);

  return (
    <ThemeProvider className="home-container" theme={theme}>
      <CssBaseline />
      <Weather />
      <Search />
    </ThemeProvider>
  );
}
