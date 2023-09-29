"use client";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import theme from "../../theme";

import React from "react";

const MuiThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{p: { xs: "0rem", sm: "0rem", md: "0rem", lg: "0rem" }}}>{children}</Container>
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
