import { Box } from "@mui/material";
import { useThemeStore } from "./states";
import Location from "./location";

export default function Weather() {
  const theme = useThemeStore((state) => state.theme);
  return (
    <Box
      className="weather-container"
      sx={{
        background: theme.palette.primary.main,
        width: "60vw",
        height: "100%",
        borderRadius: "1.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Location />
      <Box className="hourly-container"></Box>
      <Box className="daily-container"></Box>
    </Box>
  );
}
