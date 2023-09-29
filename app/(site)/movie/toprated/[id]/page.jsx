import React from "react";
import SearchBar from "../../../../components/UI/searchbar/SearchBar";
import CollectionPageTemplate from "../../../../components/UI/collections/CollectionPageTemplate";
import SearchBarDesktopOnly from "../../../../components/ui/searchbar/SearchBarDesktopOnly";

const page = ({ params }) => {
  return (
    <>
      <SearchBar placeholder="Search Movies" searchPath="/search/movie/" />
      <main className=" bg-background border-t border-primary min-h-screen">
        <SearchBarDesktopOnly
          placeholder="Search Movies"
          searchPath="/search/movie/"
        />
        <CollectionPageTemplate
          title="Top-Rated"
          params={params}
          endpoint="/api/movie/toprated/"
          mediaType="movie"
        />
      </main>
    </>
  );
};

export default page;
