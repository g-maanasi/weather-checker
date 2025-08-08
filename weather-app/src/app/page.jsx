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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className="home-container"
        sx={{
          width: "100vw",
          height: "100vh",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          p: 2,
        }}
      >
        <Weather />
        <Search />
      </Box>
    </ThemeProvider>
  );
}
