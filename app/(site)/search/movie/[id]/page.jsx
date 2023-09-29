"use client";
import React, { useState } from "react";
import { fetcher } from "../../../../utils/fetcher";
import useSWR from "swr";
import SearchBar from "../../../../components/UI/searchbar/SearchBar";
import SearchBarDesktopOnly from "../../../../components/UI/searchbar/SearchBarDesktopOnly";
import Loading from "../../../../components/UI/load/Loading";
import CardRegular from "@/app/components/cards/CardRegular";
import PaginationComponent from "@/app/components/UI/pagination/PaginationComponent";

const Page = ({ params }) => {
  const [page, setPage] = useState(1);
  const query = params.id;
  const endpoint = `/api/search/movie/${query}?page=${page}`;

  const { data, error } = useSWR(endpoint, fetcher);

  if (error) {
    console.error("Error:", error);
    return <div>Error loading data</div>;
  }

  return (
    <>
      <SearchBar placeholder="Search TV & Movies" searchPath="/search/" />
      <main className="bg-background border-t border-primary min-h-screen w-full">
        <SearchBarDesktopOnly
          placeholder="Search Movies"
          searchPath="/search/movie/"
        />

        {/* title section - 'query' heading*/}

        {data ? (
          <>
            <div className=" px-4 dk:p-0 flex items-center justify-between bg-background  shadow:md ">
              <h1 className="tracking-in-expand font-bold text-heading-sm dk:text-heading-lg my-2 dk:ml-8 text-surface">
                <span className="text-surface font-bold text-body-sm">
                  <span className="mr-[.5rem] font-bold text-heading-lg">
                    {data.total_results}
                  </span>
                  <span>RESULTS for: </span>
                </span>
                {decodeURI(query)}
              </h1>

             
              {data.length < 20 ? (
                <div className="font-bold text-body-md text-surface dk:mr-8">
                  <span>PAGE: 1</span> OF <span>1</span>
                </div>
              ) : (
                <div className="font-bold text-body-md text-surface dk:mr-8">
                  <span>PAGE: {page}</span> OF <span>{data?.total_pages}</span>
                </div>
              )}
            </div>

            {/* display results*/}

            <div className="grid grid-cols-2 tb:grid-cols-3 dk:grid-cols-4 gap-y-2 gap-x-2 tb:gap-y-4 tb:gap-x-4 px-4 tb:px-6 dk:px-8 mt-[2rem]">
              {data.results.slice(0, 20).map((result) => (
                <CardRegular key={result.id} result={result} media_type mediaType="movie"/>
              ))}
            </div>
            {/* pagination */}
            <PaginationComponent
              totalPages={data.total_pages}
              page={page}
              setPage={setPage}
            />
          </>
        ) : (
          <Loading />
        )}
      </main>
    </>
  );
};

export default Page;
