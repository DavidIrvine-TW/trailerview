import React from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

function Title({
  filmName,
  subtitle,
  setPlayTrailer,
  playTrailer,
  data,
  setCurrentVideoIndex,
  currentVideoIndex,
}) {
  const keyAmount = data.movieVideo.results.length;

  const changeVideo = (step) => {
    const newIndex = currentVideoIndex + step;
    if (newIndex >= 0 && newIndex < data.movieVideo.results.length) {
      setCurrentVideoIndex(newIndex);
    }
  };

  return (
    <article className="absolute bottom-0 left-0 right-0 flex flex-col justify-center p-2 dk:p-4">
      <div
        id="panel"
        className={
          playTrailer
            ? " hidden"
            : "absolute top-0 bottom-0 left-0 right-0 z-[5] bg-background opacity-70 rounded"
        }
      />
      <div className={playTrailer ? "hidden" : "z-10"}>
        <div>
          <h1 className=" text-body-md dk:text-heading-lg text-surface font-bold relative z-[10] text-left truncate ">
            {filmName}
          </h1>
          <p className="text-body-sm dk:text-[1.5rem] text-primary relative z-[10] text-left  ">
            {subtitle}
          </p>
        </div>

        <div>
          <div>
            <button
              onClick={() => setPlayTrailer(true)}
              className={
                data.movieVideo.results.length === 0
                  ? "hidden"
                  : "flex items-center gap-[.5rem] text-surface relative z-[10] mt-[.5rem] cursor-pointer text-body-md dk:text-heading-sm"
              }
            >
              <PlayArrowRoundedIcon sx={{ color: "#fafafa" }} />
              Play
            </button>
          </div>



          {/* select a trailer */}
          <div className="flex flex-row gap-[.5rem] z-10 items-center">
            <button
              onClick={() => changeVideo(-1)}
              disabled={currentVideoIndex === 0}
            >
              <ArrowBackIosNewRoundedIcon/> Previous
            </button>

            <span>{currentVideoIndex} / {data.movieVideo.results.length}</span>





            <button
              onClick={() => changeVideo(1)}
              disabled={currentVideoIndex === keyAmount - 1}
            >
             Next <ArrowForwardIosRoundedIcon/> 
            </button>
            <p>Title: {data.movieVideo.results[currentVideoIndex].name}</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setPlayTrailer(false)}
        className={
          playTrailer
            ? "flex items-center text-surface absolute bottom-[90%] left-[.5rem] z-[1000000] bg-background cursor-pointer text-body border border-surface px-2 "
            : "hidden"
        }
      >
        CLOSE
      </button>
    </article>
  );
}

export default Title;
