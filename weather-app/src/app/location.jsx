import { Box, Typography } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";

export default function Location() {
  return (
    <Box className="location">
      <Box
        className="location-metadata"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          mt: "2rem",
          width: "53vw",
        }}
      >
        <Box
          className="city"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            float: "left",
          }}
        >
          <LocationCityIcon sx={{ fontSize: 30, alignSelf: "center" }} />
          <Typography
            sx={{
              fontSize: 30,
              ml: 1,
              alignSelf: "center",
              fontWeight: "bold",
            }}
          >
            New York City, USA
          </Typography>
        </Box>
        <Box
          className="datetime"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            ml: "auto",
          }}
        >
          <Typography sx={{ float: "left", fontSize: 18, ml: 1 }}>
            TEST
          </Typography>
          <Typography sx={{ float: "left", fontSize: 18, ml: 1 }}>
            TEST
          </Typography>
        </Box>
      </Box>
      <Box
        className="current-weather"
        sx={{
          backgroundColor: "#ffffff",
          width: "53vw",
          height: "15rem",
          borderRadius: "1.3rem",
          mt: 1,
          boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        }}
      >
        e
      </Box>
    </Box>
  );
}
