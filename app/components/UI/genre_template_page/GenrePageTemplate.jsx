import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import SwiperTrending from "../swiper/SwiperTrending";
import CardRegular from "../../cards/CardRegular";
import PaginationComponent from "../pagination/PaginationComponent";
import Loading from "../load/Loading";

const GenrePagetemplate = ({ mediaType, params }) => {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const genreName = searchParams.get("name");
  const genreId = params.id;

  const endpoint =
    mediaType == "movie"
      ? `/api/movie/genre/${genreId}?&name=${genreName}&page=${page}`
      : `/api/tv/genre/${genreId}?&name=${genreName}&page=${page}`;

  const { data, error } = useSWR(endpoint, fetcher);
  if (error) {
    console.error("Error:", error);
    return (
      <div className="text-surface text-center">
        Yikes! There was an error loading your data... please refresh the page.
      </div>
    );
  }

  console.log(data);

  return (
    <section>
      {data ? (
        <div className="px-4 dk-px-0 flex items-center justify-between bg-background rounded shadow:md ">
          <h1 className=" text-center dk:text-left tracking-in-expand font-bold text-heading-sm dk:text-heading-lg  my-2 dk:ml-4 text-surface">
            <span className="text-surface font-bold text-body-sm">
              <i>GENRE: </i>{" "}
            </span>
            {genreName}
          </h1>

          {/* title section - page numbers */}

          {data ? (
            <div className="font-bold dk:text-body-md text-body-sm text-surface dk:mr-4">
              <span>PAGE: {page}</span> OF{" "}
              <span>{data?.total_pages > 1000 ? "500" : data.total_pages}</span>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {data ? (
        <SwiperTrending data={data} mediaType={mediaType} />
      ) : (
        <Loading />
      )}

      {data ? (
        <div className="bg-background grid grid-cols-1 tb:grid-cols-3 dk:grid-cols-4 gap-y-2 gap-x-2 tb:gap-y-4 tb:gap-x-4 px-4 tb:px-6 dk:px-8 mt-[2rem]">
          {data.results.slice(8, 20).map((result) => (
            <CardRegular
              key={result.id}
              result={result}
              mediaType={mediaType}
            />
          ))}
        </div>
      ) : (
        ""
      )}

      {data?.total_pages > 1 ? (
        <PaginationComponent
          totalPages={data.total_pages}
          setPage={setPage}
          page={data.page}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default GenrePagetemplate;
