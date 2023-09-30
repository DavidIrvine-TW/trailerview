import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";
import TvIcon from "@mui/icons-material/Tv";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Link from "next/link";

const CardRegularDisplay = ({
  mediaType,
  result,
  hover,
  playTrailer,
}) => {
  const releaseDate = new Date(result.release_date || result.first_air_date);
  const year = releaseDate.getFullYear();
  const media = result.media_type || result.mediaType || mediaType;
  console.log(media);

  const hoverTitleColor = hover ? "text-background " : "text-primary";
  const playTitleHide = playTrailer ? "invisible" : "visible ";

  return (
    <div className={`${playTitleHide} flex flex-col z-10  bottom-0 left-0 p-2`}>
      <div className={`${hoverTitleColor} flex items-center  gap-[.4rem] z-10`}>
        <p className="text-[11px] text-inherit">{isNaN(year) ? "N/A" : year}</p>
        <span>&#183;</span>
        {media === "tv" ? (
            <TvIcon fontSize="small" />
          ) : (
            <LocalMoviesRoundedIcon fontSize="small" />
          )}
        <span>&#183;</span>
        {media === "tv" ? (
          <p className="text-[11px] text-inherit">TV Series</p>
        ) : (
          <p className="text-[11px] text-inherit">Movie</p>
        )}
      </div>
      <p
        className={`${hoverTitleColor} z-10 truncate text-ellipsis font-bold text-body-md tb:text-heading-xs`}
      >
        {result.title ||
          result.original_title ||
          result.orginal_name ||
          result.name}
      </p>
    </div>
  );
};

export default CardRegularDisplay;
