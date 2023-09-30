"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import CardRegular from "../../cards/CardRegular";
import PaginationComponent from "../pagination/PaginationComponent";
import Loading from "../load/Loading";

const CollectionPageTemplate = ({ title, endpoint, mediaType }) => {
  const [page, setPage] = useState(1);

  const { data, error } = useSWR(`${endpoint}${page}`, fetcher);
  if (error) {
    console.error("Error:", error);
    return <div>Error loading data</div>;
  }
  console.log(data);
  return (
    <section>
      <div className="flex items-center justify-between bg-background  shadow:md px-4 ">
        <h1 className=" text-center dk:text-left tracking-in-expand font-bold text-heading-xs dk:text-heading-lg my-2 dk:ml-8 text-surface">
          <span className="text-surface font-bold text-body-sm">
            {mediaType == "movie" ? <i>MOVIE:</i> : <i>TV:</i>}
          </span>
          {title}
        </h1>
        {data ? (
          <div className="font-bold text-body-md text-surface dk:mr-8">
            <span>PAGE: {page}</span> OF{" "}
            <span>{data?.total_pages > 500 ? "500" : data.total_pages}</span>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="grid grid-cols-2 tb:grid-cols-3 dk:grid-cols-4 gap-y-2 gap-x-2 tb:gap-y-4 tb:gap-x-4 px-4 tb:px-6 dk:px-4 mt-[2rem] bg-background py-[1rem]">
        {data?.results?.slice(0, 20).map((result) => (
          <CardRegular key={result.id} result={result} mediaType={mediaType} />
        ))}
      </div>

      {data?.total_pages > 1 ? (
        <PaginationComponent
          totalPages={data.total_pages}
          page={page}
          setPage={setPage}
        />
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default CollectionPageTemplate;
