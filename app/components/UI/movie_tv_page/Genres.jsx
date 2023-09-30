import React from "react";
import SpanTagGenre from "../../tags/SpanTagGenre";

function Genres({ genres, mediaType }) {
  return (
    <article className="px-4 dk:px-0 dk:text-heading-sm max-w-[1000px] ">
      <h2 className="font-bold mb-[.5rem]">Genres:</h2>
      {genres.map((genre) => (
        <SpanTagGenre mediaType={mediaType} key={genre.id}>
          {genre.name}
        </SpanTagGenre>
      ))}
    </article>
  );
}

export default Genres;
