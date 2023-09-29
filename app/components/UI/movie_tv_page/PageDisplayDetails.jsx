import React from "react";
import { Image, Shimmer } from "react-shimmer";
import Rating from "@mui/material/Rating";
import Info from "./Info";
import Genres from "./Genres";
import Blurb from "./Blurb";
import Links from "./Links";
import Cast from "./Cast";

const PageDisplayDetails = ({ mediaType, data }) => {
  const score = data.movieDetail.vote_average;
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
              data.movieDetail.poster_path
                ? `https://image.tmdb.org/t/p/original/${data.movieDetail.poster_path}`
                : ""
            }
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
        <Genres 
          genres={data.movieDetail.genres || []} mediaType="movie" />
        <Blurb 
          filmBlurb={data.movieDetail.overview} />
        <Cast 
          casts={data.movieCredits.cast} />
        <Info 
          mediaType="movie" 
          data={data} />
        <Links
          website={data.movieDetail.homepage}
          imdb={data.movieDetail.imdb_id}
        />
      </div>
    </article>
  );
};

export default PageDisplayDetails;
