import { Box } from "@mui/material";

export default function Weather() {
  return (
    <Box className="weather-container">
      <Box className="location-metadata"></Box>
      <Box className="hourly-container"></Box>
      <Box className="daily-container"></Box>
    </Box>
  );
}
