
import React from "react";

const SpanTag = ({ tag, mediaType }) => {
  return (
    <span
      className={
        mediaType == "tv"
          ? "px-1 mr-[10px] py-[2px] border-2 bg-secondary leading-3 text-surface uppercase font-bold rounded-lg text-[.65rem] dk:text-body-sm"
          : "px-1 mr-[10px] py-[2px] border-2 bg-secondary leading-3 text-surface uppercase font-bold rounded-lg text-[.65rem] dk:text-body-sm"
      }
    >
      {tag}
    </span>
  );
};

export default SpanTag;
