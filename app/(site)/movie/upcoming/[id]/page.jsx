import React from "react";
import SearchBar from "../../../../components/UI/searchbar/SearchBar";
import CollectionPageTemplate from "../../../../components/UI/collections/CollectionPageTemplate";
import SearchBarDesktopOnly from "../../../../components/UI/searchbar/SearchBarDesktopOnly";

const Page = ({ params }) => {
  return (
    <>
      <SearchBar placeholder="Search Movies" searchPath="/search/movie/" />
      <main className=" bg-background border-t border-primary min-h-screen">
        <SearchBarDesktopOnly
          placeholder="Search Movies"
          searchPath="/search/movie/"
        />
        <CollectionPageTemplate
          title="Upcoming"
          params={params}
          endpoint="/api/movie/upcoming/"
          mediaType="movie"
        />
      </main>
    </>
  );
};

export default Page;
