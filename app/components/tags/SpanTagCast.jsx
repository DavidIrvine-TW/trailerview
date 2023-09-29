import React from "react";

const SpanTagCast = ({ children, mediaType }) => {
  return (
    <span
      className={
        mediaType == "tv"
          ? "px-4 py-[4px] border-2 border-secondary leading-3 text-secondary uppercase font-bold  text-[.65rem] dk:text-body-sm"
          : "px-4 py-[4px] border-2 bg-secondary leading-3 text-surface uppercase font-bold  text-[.65rem] dk:text-body-sm"
      }
    >
      {children}
    </span>
  );
};

export default SpanTagCast;
