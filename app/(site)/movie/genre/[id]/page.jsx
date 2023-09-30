"use client";
import React, { useState, useEffect, useRef } from "react";
import GenreSelectComboBox from "@/app/components/combobox/GenreSelectComboBox";
import { fetcher } from "../../../../utils/fetcher";
import useSWR from "swr";
import Loading from "../../../../components/UI/load/Loading";
import { useRouter } from "next/navigation";
import SearchBar from "@/app/components/UI/searchbar/SearchBar";
import SearchBarDesktopOnly from "../../../../components/UI/searchbar/SearchBarDesktopOnly";
import GenrePagetemplate from "@/app/components/UI/genre_template_page/GenrePageTemplate";


const page = ({params}) => {

  const router = useRouter();
  const endpoint = "/api/movie";
  const { data, error } = useSWR(endpoint, fetcher); 
  const [selectedGenre, setSelectedGenre] = useState({});
  const firstRender = useRef(true);

  //fires upon selection of a genre
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    router.push(
      `/movie/genre/${selectedGenre.id}?&name=${selectedGenre.label}`
    );
  }, [selectedGenre, router]);

  // SWR 
  if (error) {
    console.error("Error:", error);
    return <div className="text-surface text-center">Yikes! There was an error loading your data... please refresh the page.</div>;
  }
  

  return (
    <>
      <SearchBar
        mediaType="movie"
        placeholder="Search Movies"
        searchPath="/search/movie/"
      />
      <main className=" bg-background border-t border-primary min-h-screen w-full">
        {data ? (
          <>
            <div className="flex dk:px-4 dk:pl-8 dk:pr-0 items-center justify-between">
              <div className="flex gap-[2rem] p-4 dk:p-0 items-center justify-between">
                <h1 className="tracking-in-expand font-bold text-surface my-2 text-body-md ">
                  MOVIES BY GENRE
                </h1>
                <GenreSelectComboBox
                  mediaType="movie"
                  data={data}
                  setGenreSelected={setSelectedGenre}
                />
              </div>
              <SearchBarDesktopOnly
                placeholder="Search Movies"
                searchPath="/search/movie/"
              />
            </div>
              <GenrePagetemplate mediaType="movie" params={params}/>
         

          </>
        ) : (
          <Loading />
        )}
      </main>
    </>
  );
};

export default page;
