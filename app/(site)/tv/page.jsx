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
  const endpoint = "/api/tv";
  const { data, error } = useSWR(endpoint, fetcher);
  const [selectedGenre, setSelectedGenre] = useState({});
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    router.push(
      `/tv/genre/${selectedGenre.id}?&name=${selectedGenre.label}&page=1`
    );
  }, [selectedGenre, router]);

  if (error) {
    console.error("Error:", error);
    return (
      <div className="text-surface text-center">
        Yikes! There was an error loading your data... please refresh the page.
      </div>
    );
  }

  return (
    <>
      <SearchBar
        mediaType="tv"
        placeholder="Search TV Series"
        searchPath="/search/tv/"
      />
      <main className=" bg-background border-t border-primary min-h-screen w-full">
        {data ? (
          <>
            <div className="flex dk:px-4  dk:pl-8 dk:pr-0 items-center justify-between">
              <div className="flex dk:flex-row gap-[.5rem] dk:gap-[2rem] p-4 dk:p-0 items-center justify-between">
                <h1 className="tracking-in-expand font-bold text-body-md text-surface my-2 ">
                  TV BY GENRE
                </h1>
                <GenreSelectComboBox
                  mediaType="tv"
                  data={data}
                  setGenreSelected={setSelectedGenre}
                />
              </div>
              <SearchBarDesktopOnly
                placeholder="Search TV Series"
                searchPath="/search/tv/"
              />
            </div>

            <DefaultGenre
              endpoint="/api/tv/defaultgenre/"
              title="Family"
              mediaType="tv"
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
