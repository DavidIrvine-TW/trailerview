import React from 'react'
import { Button } from "@mui/base/Button";

const SeeMoreBtn = (props) => {
    const { onClick, href} = props
  return (
    <Button href={href} onClick={onClick} className="hover:underline cursor-pointer text-surface font-bold uppercase text-[.75rem] dk:text-body-md tracking-wide">see more</Button>
  )
}

export default SeeMoreBtn