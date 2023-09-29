"use client";
import React, { useState } from "react";
import FilmRating from "./FilmRating";
import Info from "./Info";
import Cast from "./Cast";
import Genres from "./Genres";
import Blurb from "./Blurb";
import Links from "./Links";
import Loading from "../load/Loading";
import PageDisplayImage from "./PageDisplayImage";
import PageDisplayDetails from "./PageDisplayDetails";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import SearchBar from "../searchbar/SearchBar";
import StandardBtn from "../../buttons/StandardBtn";
import { useRouter } from "next/navigation";

//MOVIE PAGE
const MainPage = ({ params }) => {
  // set display info/video
  const [pageDisplay, setPageDisplay] = useState(2);
  const router = useRouter();
  //data fetch
  const id = params.id;
  const endpoint = "/api/movie/";
  const { data, error } = useSWR(`${endpoint}${id}`, fetcher);
  if (error) {
    console.error("Error:", error);
    return <div>Yikes..... there was an error loading your data!</div>;
  }

  const handleGoBack = () => {
    router.back(id); // This will take the user back to the previous page
  };

  return (
    <>
      {/* header section */}
      {/* searchbar small screens */}
      <SearchBar placeholder="Search Movies" searchPath="/search/movie/" />
      {/* maincontent */}
      <section className="bg-surface dk:bg-background ">
        {/* body section */}
        {data ? (
          // display desktop only
          <div className="w-full">
            <article className="hidden dk:inline-flex flex-col shadow:md dk:p-10 rounded bg-background w-full">
              {pageDisplay === 1 && (
                <PageDisplayImage mediaType="movie" data={data} /> //image/video
              )}
              {pageDisplay === 2 && (
                <PageDisplayDetails mediaType="movie" data={data} /> // details
              )}
              <div className="flex gap-[2rem] mx-auto mt-4">
                <div className=" flex flex-start">
                  <StandardBtn onClick={handleGoBack}>Back</StandardBtn>
                </div>

                <StandardBtn
                  disabled={pageDisplay === 1}
                  onClick={() => setPageDisplay(1)}
                >
                  Trailer
                </StandardBtn>
                <StandardBtn
                  disabled={pageDisplay === 2}
                  onClick={() => setPageDisplay(2)}
                >
                  Details
                </StandardBtn>
              </div>
              
            </article>

            {/* small screen display */}
            <article className="dk:hidden">
              <PageDisplayImage mediaType="movie" data={data} />
              <FilmRating score={data.movieDetail.vote_average} />
              <Info mediaType="movie" data={data} />
              <Genres
                genres={data.movieDetail.genres || []}
                mediaType="movie"
              />
              <Blurb filmBlurb={data.movieDetail.overview} />
              <Cast casts={data.movieCredits.cast} />
              <Links
                website={data.movieDetail.homepage}
                imdb={data.movieDetail.imdb_id}
              />
            </article>
          </div>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
};

export default MainPage;
