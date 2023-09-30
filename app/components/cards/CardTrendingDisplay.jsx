import React from "react";
import TvIcon from "@mui/icons-material/Tv";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";

const CardTrendingDisplay = ({ result, mediaType, playTrailer }) => {
  const releaseDate = new Date(result.release_date || result.first_air_date);
  const year = releaseDate.getFullYear();
  const hideTitleOnPlay = playTrailer ? "invisible " : "visible";

  return (
    <div className={` ${hideTitleOnPlay} absolute z-20 w-full bottom-0`}>
      <div className="fade-in relative z-1000 py-2 px-3 dk:px-4">
        <div className="flex w-full items-center gap-[.4rem] text-primary-dark">
          <p className="text-[11px] dk:text-body-md">{year}</p>
          <span>&#183;</span>
          {mediaType === "tv" ? (
            <TvIcon fontSize="small" sx={{ color: "inherit" }} />
          ) : (
            <LocalMoviesRoundedIcon
              fontSize="small"
              sx={{ color: "inherit" }}
            />
          )}
          <span>&#183;</span>
          {mediaType === "tv" ? (
            <p className="text-[11px] dk:text-body-md text-inherit">TV</p>
          ) : (
            <p className="text-[11px] dk:text-body-md text-inherit">Movie</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="z-2 text-surface truncate text-ellipsis font-bold text-heading-xs dk:text-heading-md">
              {result.original_title || result.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTrendingDisplay;
