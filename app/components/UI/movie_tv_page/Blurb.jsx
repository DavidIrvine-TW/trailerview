import React from 'react'

function Blurb({filmBlurb}) {
  return (
    <article className='px-4 my-[1.5rem] dk:px-0 dk:text-heading-sm '>
      <h3 className='font-bold mb-[.5rem]'>Synopsis: </h3>
      
      <p className='text-body-md dk:text-heading-xs'>{filmBlurb}</p>
    
    </article>
  )
}

export default Blurb