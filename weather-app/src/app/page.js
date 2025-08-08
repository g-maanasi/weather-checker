import Image from "next/image";
import { Box } from "@mui/material";
import Search from "./search";
import Weather from "./weather";

export default function Home() {
  return (
    <Box className="home-container">
      <Weather />
      <Search />
    </Box>
  );
}
