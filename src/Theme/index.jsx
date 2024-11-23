import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#96429E", // Put Your Primary color of website
    },
    secondary: {
      main: "#db3a3e", // Put Your Secondary color of website
    },
    primaryText: {
      main: "#1C1B1F", // Put Your Primary text color of website
    },
    secondaryText: {
      main: "#888", // Put Your Secondary text color of website
    },
    success: {
      main: "#198754", // Green
    },
    danger: {
      main: "#dc3545", // Red
    },
    warning: {
      main: "#ffc107", // Mustered Yellow
    },
    info: {
      main: "#0dcaf0", // Indigo Color
    },
    light: {
      main: "#f8f9fa", // light Gray Color
    },
    black: {
      main: "#000000", // Black
    },
    white: {
      main: "#FFFFFF", // White
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});