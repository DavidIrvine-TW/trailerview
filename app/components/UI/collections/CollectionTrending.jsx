"use client";
import { fetcher } from "../../../utils/fetcher";
import useSWR from "swr";
import React from "react";
import Heading from "../heading/Heading";
import SwiperTrending from "../swiper/SwiperTrending";
import Loading from "../load/Loading";

const CollectionTrending = ({ endpoint, href, title, tag, mediaType }) => {
  const { data, error } = useSWR(endpoint, fetcher);

  if (error) {
    console.error("Error:", error);
    return <div>Error loading data</div>;
  }

  return (
    <>
      {data ? (
        <section id="homeTrendingCards" className="mx-auto bg-background  ">
          <Heading title={title} tag={tag} href={href} mediaType={mediaType} />

          <div className="min-w-[375px]">
            <SwiperTrending data={data} mediaType={mediaType} />
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CollectionTrending;
