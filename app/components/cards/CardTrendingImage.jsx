import React from "react";
import Image from "next/image";

const CardTrendingImage = ({ result }) => {
  return (
    <Image
      className="relative z-0 rounded"
      src={
        result.backdrop_path
          ? `https://image.tmdb.org/t/p/w780/${result.backdrop_path}`
          : ""
      }
      style={{ objectFit: "cover" }}
      width={800}
      height={600}
      alt={result.name || result.title}
      priority={true}
    />
  );
};

export default CardTrendingImage;
