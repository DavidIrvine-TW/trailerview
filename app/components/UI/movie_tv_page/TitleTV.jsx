import React from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

function TitleTV({ filmName, subtitle, setPlayTrailer, playTrailer, data }) {
  return (
    <article className="absolute bottom-0 left-0 right-0 flex flex-col justify-center p-2 dk:p-4">
      <div
        id="panel"
        className={
          playTrailer
            ? " hidden"
            : "absolute top-0 bottom-0 left-0 right-0 z-[5] bg-background opacity-30 rounded"
        }
      />
      <div className={playTrailer ? "hidden" : ""}>
        <h1 className=" text-body-md dk:text-heading-lg text-surface font-bold relative z-[10] text-left truncate ">
          {filmName}
        </h1>
        <p className="text-body-sm dk:text-[1.5rem] text-surface relative z-[10] text-left  ">
          {subtitle}
        </p>
        <button
          onClick={() => setPlayTrailer(true)}
          className={
            data.tvVideos.results.length === 0
              ? "hidden"
              : "flex items-center gap-[.5rem] text-surface relative z-[10] mt-[.5rem] cursor-pointer text-body-md dk:text-heading-sm"
          }
        >
          <PlayArrowRoundedIcon sx={{ color: "#fafafa" }} />
          Play
        </button>
      </div>

      <button
        onClick={() => setPlayTrailer(false)}
        className={
          playTrailer
            ? "flex items-center  text-surface absolute bottom-[90%] left-[.5rem] z-[1000000] bg-background cursor-pointer text-body border border-surface px-2 "
            : "hidden"
        }
      >
        CLOSE
      </button>
    </article>
  );
}

export default TitleTV;
