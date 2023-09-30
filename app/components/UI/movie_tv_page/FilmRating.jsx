import React from "react";
import Rating from "@mui/material/Rating";

const FilmRating = ({ score }) => {
  const renderRating = (score) => {
    if (score !== undefined) {
      return (score / 2).toFixed(1);
    } else {
      return 0;
    }
  };

  return (
    <article className="flex flex-col text-center my-[2rem]">
      <Rating
        sx={{
          fontSize: { xs: "2rem", sm: "2rem", md: "2.5rem", lg: "2.5rem" },
        }}
        name="read-only"
        value={renderRating(score)}
        readOnly
        className="mx-auto"
      />
      <p className="dk:mt-[.5rem] font-bold text-secondary dk:text-heading-md">
        {" "}
        {score.toFixed(1)}
      </p>
    </article>
  );
};

export default FilmRating;
