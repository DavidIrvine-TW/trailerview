import React from "react";

const SpanTagGenre = ({ children, mediaType }) => {
  return (
    <span
      className={
        mediaType == "tv"
          ? "px-1 py-[2px] border-2 border-secondary leading-3 text-secondary uppercase font-bold rounded-lg text-[.65rem]"
          : "px-1 py-[2px] border-2 bg-secondary leading-3 text-surface uppercase font-bold rounded-lg text-[.65rem]"
      }
    >
      {children}
    </span>
  );
};

export default SpanTagGenre;
