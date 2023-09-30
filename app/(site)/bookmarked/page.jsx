"use client";
import React from "react";
import SearchBar from "@/app/components/UI/searchbar/SearchBar";
import SearchBarDesktopOnly from "../../components/UI/searchbar/SearchBarDesktopOnly";
import CardRegular from "@/app/components/cards/CardRegular";
import { useBookmarkContext } from "../../context/BookmarkContext";

const Page = ({ mediaType }) => {
  const { bookmarkedCards } = useBookmarkContext();
  const userBookmarks = bookmarkedCards;

  return (
    <>
      <SearchBar
        placeholder="Search Movies or TV series"
        searchPath="/search/"
      />
      <main className=" bg-background border-t border-primary min-h-screen">
        <SearchBarDesktopOnly
          placeholder="Search Movies or TV series"
          searchPath="/search/"
        />

        <section className="px-4">
          <div className="flex items-center justify-between bg-background mb-[1rem]">
            <h1 className=" text-center dk:text-left tracking-in-expand font-bold text-heading-xs dk:text-heading-lg my-2 dk:ml-8 text-surface">
              <span className="text-surface font-bold text-body-sm">
                <i>USER:</i>
              </span>
              Bookmarks
            </h1>

            <div className="font-bold text-body-md text-surface dk:mr-8">
              <span>You have {userBookmarks.length - 1} bookmarks</span>
            </div>
          </div>

          <h2 className="font-bold text-surface dk:ml-8 ">MOVIES</h2>
          <div className="grid grid-cols-2 tb:grid-cols-3 dk:grid-cols-4 gap-y-2 gap-x-2 tb:gap-y-4 tb:gap-x-4 px-4 tb:px-6 dk:px-4  py-[1rem]">
            {userBookmarks
              .filter((bookmark) => bookmark.mediaType === "movie")
              .map((result) => (
                <CardRegular
                  key={result.id}
                  result={result}
                  mediaType={mediaType}
                />
              ))}
          </div>

          <h3 className="font-bold text-surface dk:ml-8">TV SERIES</h3>
          <div className="grid grid-cols-2 tb:grid-cols-3 dk:grid-cols-4 gap-y-2 gap-x-2 tb:gap-y-4 tb:gap-x-4 px-4 tb:px-6 dk:px-4  py-[1rem]">
            {userBookmarks
              .filter((bookmark) => bookmark.mediaType === "tv")
              .map((result) => (
                <CardRegular
                  key={result.id}
                  result={result}
                  mediaType={mediaType}
                />
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
