import React from "react";
import { Image, Shimmer } from "react-shimmer";
import YouTube from "react-youtube";

const PosterImageTV = ({ src, title, playTrailer, data, mediaType }) => {

  // check for officialTrailer if not available then selects the first valid key
  const renderTrailer = () => {
    
    const officialTrailer = data.tvVideos.results.find(
      (item) => item.name === "Official Trailer"
    );
    const key = officialTrailer
      ? officialTrailer.key
      : data.tvVideos.results[0].key;
      console.log(key)

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
      {data.tvVideos && playTrailer ? renderTrailer() : null}
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

export default PosterImageTV;
