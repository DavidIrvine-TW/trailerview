import React from 'react'
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";

function Header() {
  return (
    <article className=' absolute top-0 flex gap-[.5rem] items-center mb-8 '>
        <LocalMoviesRoundedIcon sx={{color: '#898989'}}/>
        <h1 className="font-bold text-surface text-heading-md z-10">Movie</h1>   
    </article>
  )
}

export default Header