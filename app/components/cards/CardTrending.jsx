import React, { useState, useEffect } from "react";
import CardTrendingDisplay from "./CardTrendingDisplay";
import CardTrendingImage from "./CardTrendingImage";
import YouTube from "react-youtube";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useSession } from "next-auth/react";
import { useBookmarkContext } from "../../context/BookmarkContext";
import { toast } from "react-toastify";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Link from "next/link";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const CardTrending = ({ mediaType, result }) => {
  const { data: session } = useSession();
  const [playTrailer, setPlay] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [screenSize, setScreenSize] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const playTitleHide = playTrailer ? "invisible" : "visible";

  const { bookmarkedCards, addBookmark, removeBookmark } = useBookmarkContext();
  const isBookmarked = bookmarkedCards.some((c) => c.id === result.id);
  const linkMediaType = result.media_type || mediaType;
  const keyAmount = result.movieData?.results.length;

  const changeVideo = (step) => {
    const newIndex = currentVideoIndex + step;
    if (newIndex >= 0 && newIndex < result.movieData?.results.length) {
      setCurrentVideoIndex(newIndex);
    }
  };

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      toast.info(`${result.title || result.orginal_name || result.name} removed `, {
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
          border: '2px solid #fafafa'
        },
      });
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
            border: '2px solid #fafafa'
          },
        }
      );
      addBookmark(result, session.user.email, mediaType);
    }
  };

  const renderTrailer = () => {
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

  useEffect(() => {
    // Function to update screen size based on window width
    const updateScreenSize = () => {
      if (window.innerWidth < 500) {
        setScreenSize(true)
        setIsHover(true); // Set screenSize to true on small screens
      } else {
        setIsHover(false)
        setScreenSize(false); // Set screenSize to false on large screens
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

  return (
    <div
      onMouseEnter={() => {
        if (result.movieData.results.length > 0) {
          setIsHover(true);
        }
      }}
      onMouseLeave={() => {
        if (screenSize) {
          setIsHover(true); // Keep isHover as true on small screens when the mouse leaves
        } else {
          setIsHover(false); // Set isHover to false on large screens when the mouse leaves
        }
      }}
      className="relative w-full max-h-[240px] overflow-hidden cursor-pointer py-2"
    >
      <CardTrendingImage result={result} />

      <button
        onClick={() => setPlay(false)}
        className={
          playTrailer
            ? "flex items-center gap-[.5rem] text-surface absolute bg-background top-[70%] left-[1rem] z-[1000000] px-2 cursor-pointer text-body border border-surface "
            : "hidden"
        }
      >
        CLOSE
      </button>

      {result.movieData?.results && playTrailer ? renderTrailer() : null}

      {/*display bookmark icons only when active session*/}
      {session ? (
        <div
          className={` ${playTitleHide} absolute top-[5%] left-0 right-0 bottom-[70%] flex justify-between gap-[.3rem] items-center z-20  `}
        >
          <div className="absolute top-[7%] right-[2%] flex flex-row gap-[.5rem] items-center">
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
          <div className="absolute left-[2%] top-[5%] gap-[.5rem] z-9">
              {result.movieData?.results.length >= 1 ? (
                <div>
                  {result.movieData?.results.length === 1 ? (
                    ''
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

                        {currentVideoIndex} / {result.movieData?.results.length -1}
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
      ) : (
        ""
      )}

      {isHover ? (
        <>
          {/* OVERLAY */}
          <div className="overlay absolute bottom-0 left-0 right-0 top-0  h-full bg-background  opacity-40 z-1 " />
          {/* TITLE DETAILS */}
          <CardTrendingDisplay
            result={result}
            mediaType={mediaType}
            playTrailer={playTrailer}
          />

          {/* PLAYBUTTON */}
          {result.movieData?.results.length === 0 ? (
            ""
          ) : (
            <div
              id="playButton"
              className={isHover || screenSize ? "cursor-pointer" : "hidden"}
            >
              <button
                className="flex items-center justify-center w-[50px] h-[50px] z-10 cursor-pointer"
                onClick={() => setPlay(true)}
              >
                <PlayArrowRoundedIcon
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    transition: "transform 0.2s", // Add a CSS transition for 'transform'
                    "&:hover": {
                      transform: "scale(1.3)", // Scale up on hover
                    },
                    fontSize: { sm: "2rem", lg: "2.5rem" },
                    display: playTrailer ? "none" : "block",
                  }}
                />
              </button>
            </div>
          )}
        </>
      ) : (
        ""
      )}

      {/* video title on hover && session*/}
      {session ? (
        <div id="videoTitleTrending" className={isHover || screenSize ? "" : "hidden"}>
          <p
            className={`${playTitleHide} text-body-sm text-center text-surface truncate text-ellipsis max-w-[150px]`}
          >
            {result &&
              result.movieData &&
              result.movieData.results[currentVideoIndex] &&
              result.movieData.results[currentVideoIndex].name}
          </p>
        </div>
      ) : (
        ""
      )}

      {/* </Link> */}
    </div>
  );
};

export default CardTrending;
