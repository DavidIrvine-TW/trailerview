import React from "react";
import SearchBar from "../../../../components/UI/searchbar/SearchBar";
import SearchBarDesktopOnly from "../../../../components/UI/searchbar/SearchBarDesktopOnly";
import CollectionPageTemplate from "../../../../components/UI/collections/CollectionPageTemplate";

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
          title="Airing Today"
          params={params}
          endpoint="/api/tv/airingtoday/"
          mediaType="tv"
        />
      </main>
    </>
  );
};

export default Page;
