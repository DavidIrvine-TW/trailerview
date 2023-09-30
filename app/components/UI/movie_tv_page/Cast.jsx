import React from "react";
import SpanTagCast from "../../tags/SpanTagCast";

function Cast({ casts }) {
  return (
    <article className="px-4  dk:my-[1.5rem] dk:px-0 dk:text-heading-xs">
      <h4 className="font-bold mb-[.5rem]">Cast & Crew</h4>
      <ul className="flex flex-wrap text-justify w-full">
        {casts.slice(0, 10).map((item) => (
          <SpanTagCast key={item.credit_id}>{item.name}</SpanTagCast>
        ))}
      </ul>
    </article>
  );
}

export default Cast;
