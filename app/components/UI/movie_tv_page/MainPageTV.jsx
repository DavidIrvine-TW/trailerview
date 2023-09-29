"use client";
import React, {useState} from "react";
import FilmRating from "./FilmRating";
import Info from "./Info";
import Cast from "./Cast";
import Genres from "./Genres";
import Blurb from "./Blurb";
import Links from "./Links";
import Loading from "../load/Loading";
import { fetcher } from "../../../utils/fetcher";
import useSWR from "swr";
import SearchBar from "../searchbar/SearchBar";
import BackDropImageTV from "./PageDisplayImageTV";
import StandardBtn from "../../buttons/StandardBtn";
import PageDisplayImageTV from "./PageDisplayImageTV";
import PageDisplayDetailsTV from './PageDisplayDetailsTV'
import { useRouter } from "next/navigation";

const MainPageTV= ({ params }) => {
  const router = useRouter()
  // set display info/video
  const [pageDisplay, setPageDisplay] = useState(2);
  //data fetch
  const id = params.id;
  const endpoint = "/api/tv/";
  const { data, error } = useSWR(`${endpoint}${id}`, fetcher);
  if (error) {
    console.error("Error:", error);
    return <div>Yikes..... there was an error loading your data!</div>;
  }
  
  const handleGoBack = () => {
    router.back(id);
  };


 
  return (
    <>
      {/* header section */}
      {/* searchbar small screens */}
      <SearchBar placeholder="Search TV Series" searchPath="/search/tv/" />
      {/* maincontent */}
      <section className="bg-surface dk:bg-background ">


        {/* body section */}
        {data ? (
          // display desktop only
          <div className="w-full">
            <article className="hidden dk:inline-flex flex-col shadow:md dk:p-10 bg-background w-full">
              {pageDisplay === 1 && (
                <PageDisplayImageTV mediaType="tv" data={data} /> //image/video
              )}
              {pageDisplay === 2 && (
                <PageDisplayDetailsTV mediaType="tv" data={data} /> // details
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
              <PageDisplayImageTV 
                mediaType="tv" 
                data={data} />
              <FilmRating 
                score={data.tvDetail.vote_average} />
              <Info 
                mediaType="tv" 
                data={data} />
              <Genres 
                genres={data.tvDetail.genres || []} 
                mediaType="tv" />
              <Blurb 
                filmBlurb={data.tvDetail.overview} />
              <Cast 
                casts={data.tvCredits.cast} />
              <Links
                website={data.tvDetail.homepage}
                imdb={data.tvDetail.imdb_id}
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

export default MainPageTV;
