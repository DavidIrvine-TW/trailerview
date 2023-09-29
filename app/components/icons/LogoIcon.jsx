import { MovieCreationRounded } from "@mui/icons-material/";

import React from "react";

const LogoIcon = () => {
  return (
    <>
      <MovieCreationRounded
        sx={{
          fontSize: { xs: "2rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
          color: "#FC4747",
        }}
      />
    </>
  );
};

export default LogoIcon;
