import React from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import GenreList from "../../../lib/GenreListTV";

const GenrePagetemplate = () => {
  const searchParams = useSearchParams();
  const genreName = searchParams.get("name");
  const page = searchParams.get("page");

  const targetGenre = GenreList.find((genre) => genre.name === genreName);
  const genreId = targetGenre ? targetGenre.id : null;

  const endpoint = `/api/tv/genre/${genreId}?&name=${genreName}&page=${page}`;

  const { data, error } = useSWR(endpoint, fetcher);

  if (error) {
    console.error("Error:", error);
    return (
      <div className="text-surface text-center">
        Yikes! There was an error loading your data... please refresh the page.
      </div>
    );
  }

  console.log(endpoint);
  console.log(data);

  return <h2>{genreName}</h2>;
};

export default GenrePagetemplate;
