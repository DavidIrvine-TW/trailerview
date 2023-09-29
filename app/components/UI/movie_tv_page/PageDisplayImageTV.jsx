import React, { useState } from "react";
import PosterImageTV from "./PosterImageTV";
import TitleTV from "./TitleTV";

const BackDropImage = ({ data }) => {
  const [playTrailer, setPlayTrailer] = useState(false);

  return (
    <div className="fade-in relative max-w-[1100px] bg-primary-light dk:rounded-lg mx-auto overflow-hidden ">
      <PosterImageTV
        data={data}
        src={data.tvDetail.backdrop_path}
        title={data.tvDetail.original_name || data.tvDetail.title}
        playTrailer={playTrailer}
      />
      <TitleTV
        filmName={data.tvDetail.original_name || data.tvDetail.title}
        subtitle={data.tvDetail.tagline}
        playTrailer={playTrailer}
        setPlayTrailer={setPlayTrailer}
        data={data}
      />
    </div>
  );
};

export default BackDropImage;
