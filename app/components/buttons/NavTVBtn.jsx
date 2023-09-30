import React from "react";
import TVIcon from "../icons/TVIcon";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

const NavTVBtn = () => {
  return (
    <>
      <Link href="/tv">
        <IconButton sx={{ padding: { md: "1rem" } }} size="large">
          <TVIcon />
        </IconButton>
      </Link>
    </>
  );
};

export default NavTVBtn;
