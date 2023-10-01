import React, { useState } from "react";
import { fetcher } from "../../../utils/fetcher";
import useSWR from "swr";
import CardRegular from "../../cards/CardRegular";
import Loading from "../load/Loading";
import PaginationComponent from "../pagination/PaginationComponent";

const DefaultGenre = ({ endpoint, mediaType, title }) => {
  const [page, setPage] = useState(1);
  const { data, error } = useSWR(`${endpoint}${page}`, fetcher);
  
  if (error) {
    console.error("Error:", error);
    return (
      <div className="text-surface text-center">
        Yikes! There was an error loading your data... please refresh the page.
      </div>
    );
  }

  return (
    <section>
      {/* title section */}
      {data ? (
        <>
          <div className="px-4 dk-px-0 flex items-center justify-between bg-background border-b border-secondary shadow:md ">
            <h1 className=" text-center dk:text-left tracking-in-expand font-bold text-heading-sm dk:text-heading-lg my-2 dk:ml-8 text-surface">
              <span className="text-surface font-bold text-body-sm">
                <i>GENRE: </i>
              </span>
              {title}
            </h1>

            {/* title section - page numbers */}

            {data ? (
              <div className="font-bold dk:text-body-md text-body-sm text-surface dk:mr-8">
                <span>PAGE: {page}</span> OF{" "}
                <span>
                  {data?.total_pages > 500 ? "500" : data.total_pages}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* display section */}

          <div className="bg-background grid grid-cols-1 tb:grid-cols-3 dk:grid-cols-4 gap-y-2 gap-x-2 tb:gap-y-4 tb:gap-x-4 px-4 py-8 tb:px-6 dk:px-4 ">
            {data?.results?.slice(0, 20).map((result) => (
              <CardRegular
                key={result.id}
                result={result}
                mediaType={mediaType}
              />
            ))}
          </div>

          {/* pagination */}

          {data.total_pages > 1 ? (
            <PaginationComponent
              totalPages={data.total_pages}
              setPage={setPage}
              page={data.page}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default DefaultGenre;
