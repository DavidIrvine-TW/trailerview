import React from 'react'
import HomeIcon from '../icons/HomeIcon'
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

const NavHomeBtn = () => {
  return (
    <>
    <Link href="/">
        <IconButton
          sx={{ padding: { md: "1rem" } }}
          size="large"
        >
          <HomeIcon/>
        </IconButton>
      </Link>
    </>
  )
}

export default NavHomeBtn