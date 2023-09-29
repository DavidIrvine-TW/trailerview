"use client";
import "./globals.css";
import CollectionTrending from "./components/UI/collections/CollectionTrending";
import Collection from "./components/UI/collections/Collection";
import SearchBar from "./components/UI/searchbar/SearchBar";
import SearchBarDesktopOnly from "./components/UI/searchbar/SearchBarDesktopOnly";
import { useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState(false);

  const setDisplayHandler = (newDisplay) => {
    setDisplay(newDisplay);
  };

  return (
    <>
      <SearchBar
        home="home"
        placeholder="Search Movies or TV"
        searchPath="/search/"
      />

      <main className="min-h-screen min-w-[375px] max-w-[1920px] border-t border-primary bg-background overflow-hidden shadow-md ">
        <SearchBarDesktopOnly
          home="home"
          placeholder="Search Movies or TV"
          searchPath="/search/"
          setDisplayHandler ={setDisplayHandler}
          display={display}
        />

        {display === false ? (
          <>
          {/* movies */}
            <CollectionTrending
              isHome
              isTrending
              endpoint="/api/movie/trending/1"
              href="/movie/trending/1"
              title={<h1>Trending</h1>}
              tag="movie"
              mediaType="movie"
            />

            <Collection
              isHome
              endpoint="/api/movie/popular/1"
              href="/movie/popular/1"
              title={<h2>Popular</h2>}
              tag="movie"
              mediaType="movie"
            />

            <Collection
              isHome
              endpoint="/api/movie/nowplaying/1"
              href="/movie/nowplaying/1"
              title={<h3>Now Playing</h3>}
              tag="movie"
              mediaType="movie"
            />

            <Collection
              isHome
              endpoint="/api/movie/upcoming/1"
              href="/movie/upcoming/1"
              title={<h4>Upcoming</h4>}
              tag="movie"
              mediaType="movie"
            />

            <Collection
              isHome
              endpoint="/api/movie/toprated/1"
              href="/movie/toprated/1"
              title={<h5>Top Rated</h5>}
              tag="movie"
              mediaType="movie"
            />
          </>
        ) : (
          <>
            {/* TV */}

            <CollectionTrending
              isHome
              isTrending
              endpoint="/api/tv/trending/1"
              href="/tv/trending/1"
              title={<h6>TV Trending</h6>}
              tag="TV series"
              mediaType="tv"
            />

            <Collection
              isHome
              endpoint="/api/tv/airingtoday/1"
              href="/tv/airingtoday/1"
              title={<p>Airing Today</p>}
              tag="TV series"
              mediaType="tv"
            />
            <Collection
              isHome
              endpoint="/api/tv/onair/1"
              href="/tv/onair/1"
              title={<p>On Air</p>}
              tag="TV series"
              mediaType="tv"
            />

            <Collection
              isHome
              endpoint="/api/tv/toprated/1"
              href="/tv/toprated/1"
              title={<p>Top Rated</p>}
              tag="TV series"
              mediaType="tv"
            />
          </>
        )}
      </main>
    </>
  );
}
