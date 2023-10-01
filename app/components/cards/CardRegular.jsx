"use client";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CardRegularDisplay from "./CardRegularDisplay";
import CardRegularImage from "./CardRegularImage";
import { Tilt } from "react-tilt";
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useSession } from "next-auth/react";
import { useBookmarkContext } from "../../context/BookmarkContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

//Tilt opts
const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 10, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.05, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const CardRegular = ({ media_type, mediaType, result }) => {
  const { data: session } = useSession();
  const [playTrailer, setPlay] = useState(false);
  const [hover, setHover] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  // const [visible, setVisible] = useState(false);
  const [screenSize, setScreenSize] = useState(false);
  const playTitleHide = playTrailer ? "invisible" : "visible";
  const linkMediaType = result.media_type || mediaType;

  const keyAmount = result.movieData?.results.length;

  const changeVideo = (step) => {
    const newIndex = currentVideoIndex + step;
    if (newIndex >= 0 && newIndex < result.movieData?.results.length) {
      setCurrentVideoIndex(newIndex);
    }
  };

  //Youtube player
  const renderTrailer = () => {
    // check for officialTrailer if not available then selects the first valid key
    const officialTrailer = result.movieData?.results.find(
      (item) => item.name === "Official Trailer"
    );
    const defaultKey = officialTrailer
      ? officialTrailer.key
      : result.movieData.results[0]?.key; // Use optional chaining to handle potential null

    // Determine the key based on user's choice or the default key
    const key =
      currentVideoIndex !== null
        ? result.movieData?.results[currentVideoIndex].key
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
            mute: 0,
          },
        }}
      />
    );
  };

  // Function to update screen size based on window width - ensure playbutton is visible on small screens
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 500) {
        setScreenSize(true); // Small screen size
      } else {
        setScreenSize(false); // Large screen size
      }
    };
    // Update
    updateScreenSize();
    // Add event listener
    window.addEventListener("resize", updateScreenSize);
    // Cleanup
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  // import bookmark functions
  const { bookmarkedCards, addBookmark, removeBookmark } = useBookmarkContext();
  // checks if current card is bookmarked
  const isBookmarked = bookmarkedCards.some((c) => c.id === result.id);

  // process bookmark clicks
  const handleBookmarkClick = () => {

    if (!session) {
      // Display a toast message indicating that the user must sign in to use bookmarks
      toast.info("You must sign in to use bookmarks", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          background: "#212121",
          color: "#FC4747",
          border: "2px solid #fafafa",
        },
      });
      return;
    }

    if (isBookmarked) {
      toast.info(
        `${result.title || result.orginal_name || result.name} removed `,
        {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: {
            background: "#212121",
            color: "#FC4747",
            border: "2px solid #fafafa",
          },
        }
      );
      removeBookmark(result.id, session.user.email);
    } else {
      toast.info(
        `${result.title || result.orginal_name || result.name} added`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",

          style: {
            background: "#cfcfcf",
            color: "green",
            border: "2px solid #fafafa",
          },
        }
      );
      addBookmark(result, session.user.email, mediaType);
    }
  };

  return (
    <Tilt className="blah" options={defaultOptions}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="fade-in rounded overflow-hidden relative w-full h-auto border border-transparent hover:shadow-md hover:border hover:bg-primary-light hover:border-surface"
      >
        {/*display bookmark/nav icons */}
       
          <div
            className={` ${playTitleHide} absolute top-[2%] left-0 right-0 bottom-[70%] flex justify-between gap-[.3rem] items-center z-10  `}
          >
            <div className="absolute top-[5%] right-[2%] flex dk:flex-col gap-[.3rem] items-center">
              {isBookmarked ? (
                <button type="button">
                  <CheckCircleOutlineRoundedIcon
                    fontSize="medium"
                    sx={{ zIndex: 8 }}
                    onClick={handleBookmarkClick}
                    style={{
                      color: "green",
                      "&:hover": {
                        transform: "scale(1.2)",
                        color: "red",
                      },
                    }}
                  />
                </button>
              ) : (
                <>
                  <button type="button">
                    <BookmarkAddOutlinedIcon
                      fontSize="small"
                      sx={{
                        zIndex: 8,
                        color: "#fafafa",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "scale(1.2)",
                          color: "green",
                        },
                      }}
                      onClick={handleBookmarkClick}
                    />
                  </button>
                </>
              )}

              <div className="z-10">
                <Link
                  href={
                    linkMediaType === "tv"
                      ? `/tv/${result.id}`
                      : `/movie/${result.id}`
                  }
                >
                  <InfoOutlinedIcon
                    sx={{
                      color: "#fafafa",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.2)",
                        color: "green",
                      },
                    }}
                  />
                </Link>
              </div>
            </div>

            {/* select a trailer */}
            <div className="absolute left-[2%] top-[5%] gap-[.5rem] z-10">
              {result.movieData?.results.length >= 1 ? (
                <div>
                  {result.movieData?.results.length === 1 ? (
                    ""
                  ) : (
                    <>
                      <button
                        onClick={() => changeVideo(-1)}
                        disabled={currentVideoIndex === 0}
                      >
                        <ArrowBackIosNewRoundedIcon
                          fontSize="small"
                          sx={{
                            color: "#fafafa",
                            "&:hover": {
                              transform: "scale(1.2)",
                            },
                          }}
                        />
                      </button>
                      <span className="text-body-sm text-surface">
                        {currentVideoIndex} /{" "}
                        {result.movieData?.results.length - 1}
                      </span>

                      <button
                        onClick={() => changeVideo(1)}
                        disabled={currentVideoIndex === keyAmount - 1}
                      >
                        <ArrowForwardIosRoundedIcon
                          fontSize="small"
                          sx={{
                            color: "#fafafa",
                            "&:hover": {
                              transform: "scale(1.2)",
                            },
                          }}
                        />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-body-sm text-surface">No videos found</p>
              )}
            </div>
          </div>
        

        {/*video close button*/}
        <button
          onClick={() => setPlay(false)}
          className={
            playTrailer
              ? "flex items-center gap-[.5rem] text-surface absolute top-[80%] left-[1rem] z-[1000000] bg-background cursor-pointer text-body border border-surface px-2 "
              : "hidden"
          }
        >
          CLOSE
        </button>

        {/* Youtube player requires video results and playtrailer = true  */}
        {result.movieData?.results && playTrailer ? renderTrailer() : null}

        {/* title backdrop/poster image  */}
        <div className="relative w-full bg-primary overflow-hidden  dk:max-h-[178px]">
          <CardRegularImage result={result} />
          {/* display play button only if there is video */}
          {result.movieData?.results.length === 0 ? (
            ""
          ) : (
            <div
              id="playButton"
              className={hover || screenSize ? "cursor-pointer" : "hidden"}
            >
              <button
                className="flex items-center justify-center w-[50px] h-[50px] z-9 cursor-pointer"
                onClick={() => setPlay(true)}
              >
                <PlayArrowRoundedIcon
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                    fontSize: { sm: "2rem", lg: "2.5rem" },
                    display: playTrailer ? "none" : "block",
                  }}
                />
              </button>
            </div>
          )}

          {/* video title on hover */}
        
            <div
              id="videoTitle"
              className={hover || screenSize ? "" : "hidden"}
            >
              <p
                className={`${playTitleHide} text-body-sm dk:text-body-md text-center text-surface truncate text-ellipsis max-w-[150px]`}
              >
                {result &&
                  result.movieData &&
                  result.movieData.results[currentVideoIndex] &&
                  result.movieData.results[currentVideoIndex].name}
              </p>
            </div>
            
          <div
            id="image-overlay"
            className="overlay absolute bottom-0 left-0 right-0 top-0  h-full bg-secondary  opacity-30 z-1 "
          />
        </div>

        {/* title details */}
        <CardRegularDisplay
          session={session}
          result={result}
          media_type={media_type}
          mediaType={mediaType}
          hover={hover}
          playTrailer={playTrailer}
        />
      </div>
    </Tilt>
  );
};

export default CardRegular;
