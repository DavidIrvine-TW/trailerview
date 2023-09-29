import React, { useState } from "react";
import PosterImage from "./PosterImage";
import Title from "./Title";

const BackDropImage = ({ data, mediaType}) => {
  const [playTrailer, setPlayTrailer] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);



  return (
    <div className="fade-in relative max-w-[1100px] bg-primary-light dk:rounded-lg mx-auto overflow-hidden ">
      <PosterImage
        data={data}
        src={data.movieDetail.backdrop_path || data.movieDetail.poster_path}
        title={data.movieDetail.title || data.movieDetail.name}
        playTrailer={playTrailer}
        mediaType={mediaType}
        currentVideoIndex={currentVideoIndex}
      />
      <Title
        filmName={data.movieDetail.title}
        subtitle={data.movieDetail.tagline}
        setPlayTrailer={setPlayTrailer}
        playTrailer={playTrailer}
        data={data}
        mediaType={mediaType}
        setCurrentVideoIndex={setCurrentVideoIndex}
        currentVideoIndex={currentVideoIndex}
      />
    </div>
  );
};

export default BackDropImage;
