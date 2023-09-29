"use client";
import React, { useState, useEffect, useRef } from "react";
import GenreSelectComboBox from "@/app/components/combobox/GenreSelectComboBox";
import { fetcher } from "../../utils/fetcher";
import useSWR from "swr";
import Loading from "../../components/UI/load/Loading";
import { useRouter } from "next/navigation";
import SearchBar from "@/app/components/UI/searchbar/SearchBar";
import SearchBarDesktopOnly from "../../components/UI/searchbar/SearchBarDesktopOnly";
import DefaultGenre from "@/app/components/UI/genre_template_page/DefaultGenre";


const Page = () => {

  const router = useRouter();
  const endpoint = "/api/movie";
  const { data, error } = useSWR(endpoint, fetcher); //fetch genre list
  const [selectedGenre, setSelectedGenre] = useState({});
  const firstRender = useRef(true);

  if (error) {
    console.error("Error:", error);
    return <div>Error loading data</div>;
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    router.push(
      `/movie/genre/${selectedGenre.id}?&name=${selectedGenre.label}`
    );
  }, [selectedGenre]);

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
              <div className="flex dk:flex-row gap-[.5rem] dk:gap-[2rem] p-4 dk:p-0 items-center justify-between">
                <h1 className="tracking-in-expand font-bold text-surface my-2 text-body-md">
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

            <DefaultGenre endpoint="/api/movie/defaultgenre/" title="Horror" mediaType="movie"/>
          
          </>
        ) : (
          // <Loading />
          ''
        )}
      </main>
    </>
  );
};

export default Page;
