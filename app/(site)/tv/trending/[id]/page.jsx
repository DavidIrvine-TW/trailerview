import React from "react";
import SearchBar from "../../../../components/UI/searchbar/SearchBar";
import CollectionPageTemplate from "../../../../components/UI/collections/CollectionPageTemplate";
import SearchBarDesktopOnly from "../../../../components/UI/searchbar/SearchBarDesktopOnly";

const Page = ({ params }) => {
  return (
    <>
      <SearchBar placeholder="Search TV Series" searchPath="/search/tv/" />
      <main className=" bg-background border-t border-primary min-h-screen">
        <SearchBarDesktopOnly
          placeholder="Search TV Series"
          searchPath="/search/tv/"
        />
        <CollectionPageTemplate
          title="Trending"
          params={params}
          endpoint="/api/tv/trending/"
          mediaType="tv"
        />
      </main>
    </>
  );
};

export default Page;
