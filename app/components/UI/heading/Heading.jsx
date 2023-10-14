import React, { useState } from "react";
import SpanTag from "../../tags/SpanTag";
import SeeMoreBtn from "../../buttons/SeeMoreBtn";
import Link from "next/link";

const Heading = ({ title, tag, href, mediaType, collType }) => {
  const [headingTracking, setHeadingTracking] = useState(true);
  const effect = headingTracking ? "text-surface" : "text-primary";

  return (
    <article className="overflow-hidden px-4 tb:px-6 dk:px-8 flex justify-between items-center py-2 mb-[1rem]">
      
        <div className="flex items-center">
          <Link href={href}>
            <div
              onMouseEnter={() => setHeadingTracking(!headingTracking)}
              onMouseLeave={() => setHeadingTracking(!headingTracking)}
              className={`tracking-in-expand  ${effect} mr-2 font-bold text-heading-xs tb:text-heading-md dk:text-heading-lg`}
            >
              {title}
            </div>
          </Link>
          <SpanTag tag={tag} mediaType={mediaType} />
        </div>
        <div>
          <Link href={href}>
            <SeeMoreBtn onClick={() => {}} />
          </Link>
        </div>
    
    </article>
  );
};

export default Heading;
