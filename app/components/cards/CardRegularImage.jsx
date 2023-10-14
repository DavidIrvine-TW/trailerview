import React from "react";
import { Image, Shimmer } from 'react-shimmer' 

const CardRegularImage = ({ result }) => {
  return (
   
      <Image
        className="z-0 rounded"
        src={result.backdrop_path ? `https://image.tmdb.org/t/p/w780/${result.backdrop_path}` : `https://image.tmdb.org/t/p/w300/${result.poster_path}`}
        style={{ objectFit: "cover" }} 
        width={500} 
        height={300}
        alt={result.name || result.title || result.original_title} 
        loading="lazy"
        fallback={<Shimmer width={500} height={300} />}
      />
 
  );
};

export default CardRegularImage;

