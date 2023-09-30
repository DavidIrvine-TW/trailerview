import React from "react";
import { Image, Shimmer } from "react-shimmer";
import Rating from "@mui/material/Rating";
import Info from "./Info";
import Genres from "./Genres";
import Blurb from "./Blurb";
import Cast from "./Cast";

const PageDisplayDetails = ({ data }) => {
  const score = data.tvDetail.vote_average;
  const renderRating = (score) => {
    if (score !== undefined) {
      return (score / 2).toFixed(1);
    } else {
      return 0;
    }
  };

  return (
    <article className="flex justify-evenly gap-[2rem] fade-in relative w-[1100px] h-auto bg-primary-light border border-primary rounded mx-auto p-[2rem]">
      <div className="flex flex-col my-auto">
        <div className="w-[350px] h-[530px] rounded-lg overflow-hidden">
          <Image
            src={
              data.tvDetail.poster_path
                ? `https://image.tmdb.org/t/p/original/${data.tvDetail.poster_path}`
                : ""
            }
            alt="movie poster"
            style={{ objectFit: "contain" }}
            // alt={title}
            fallback={<Shimmer width={350} height={530} />}
          />
        </div>

        <div className="items-center mx-auto pt-[1rem]">
          <Rating
            sx={{
              fontSize: { xs: "2rem", sm: "2rem", md: "2.5rem", lg: "2.5rem" },
            }}
            name="read-only"
            value={renderRating(score)}
            readOnly
            className="mx-auto"
          />
          <p className="font-bold text-secondary text-heading-md text-center">
            {score.toFixed(1)}
          </p>
        </div>
      </div>

      <div
        id="details-container"
        className=" rounded-lg border border-primary bg-surface p-[1rem] w-full"
      >
        <Genres genres={data.tvDetail.genres || []} mediaType="tv" />
        <Blurb filmBlurb={data.tvDetail.overview} />
        <Cast casts={data.tvCredits.cast} />
        <Info mediaType="tv" data={data} />
        {/* <Links
          website={data.tvDetail.homepage}
          imdb={data.tvDetail.imdb_id}
        /> */}
      </div>
    </article>
  );
};

export default PageDisplayDetails;
