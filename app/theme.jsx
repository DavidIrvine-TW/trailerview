import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components : {
    MuiIconButton : {
        styleOverrides : {
            root: {
                padding : '8px'

            }
        }
    },
  },
  palette: {
    primary: {
      main: "#e0e0e0",
      light: "#f5f5f5",
      dark: "#9e9e9e",
    },
    secondary: {
      main: "#0F172A",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1440,
      xl: 1920,
    },
  },
});

export default theme;
