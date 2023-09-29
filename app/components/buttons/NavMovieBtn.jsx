import React from 'react'
import MovieIcon from '../icons/MovieIcon'
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

const NavMovieBtn = () => {
  return (
    <>
    <Link href="/movie">
        <IconButton
          sx={{ padding: { md: "1rem" } }}
          size="large"
        >
          <MovieIcon/>
        </IconButton>
      </Link>
    </>
  )
}

export default NavMovieBtn