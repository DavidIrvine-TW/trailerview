import React, { useState } from "react";
import { Image, Shimmer } from "react-shimmer";
import YouTube from "react-youtube";

const PosterImage = ({ src, title, playTrailer, data, mediaType, currentVideoIndex }) => {
  
 
  const renderTrailer = () => {
    
    // check for officialTrailer if not available then selects the first valid key
  const officialTrailer = data.movieVideo.results.find(
    (item) => item.name === "Official Trailer"
  );
  const defaultKey = officialTrailer
    ? officialTrailer.key
    : data.movieVideo.results[0]?.key; // Use optional chaining to handle potential null

  // Determine the key based on user's choice or the default key
  const key = currentVideoIndex !== null
    ? data.movieVideo.results[currentVideoIndex].key
    : defaultKey;
      
    return (
      <YouTube
        className={"youtube-container"}
        videoId={key}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 1,
            volume: 50,
            mute: 0
          },
        }}
      />
    );
  };

  return (
    <>
      {data.movieDetail && playTrailer ? renderTrailer() : null}
      <Image
        className="relative z-[0] w-full h-auto  "
        src={`https://image.tmdb.org/t/p/original/${src}`}
        style={{ objectFit: "contain" }}
        alt={title}
        fallback={<Shimmer width={900} height={600} />}
      />
    </>
  );
};

export default PosterImage;
