import React from "react";
import LogoIcon from "../icons/LogoIcon";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

const NavLogoBtn = () => {
  return (
    <>
      <Link href="/">
        <IconButton sx={{ padding: { md: "1rem" } }} size="large">
          <LogoIcon />
        </IconButton>
      </Link>
    </>
  );
};

export default NavLogoBtn;
