"use client";
import React, { useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import SearchField from "./SearchField";
import { useRouter } from "next/navigation";
import SearchBtn from "../../buttons/SearchBtn";
import PageInfo from "../pageInfoControl/PageInfo";
import { usePathname } from "next/navigation";

const Searchbar = ({
  placeholder,
  searchPath,
  setDisplayHandler,
  display,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  const submitHandler = (event) => {
    event.preventDefault();
    if (query.length === 0) {
      return;
    } else {
      router.push(`${searchPath}${query.trim()}?page=1`);
      setQuery("");
    }
  };

  return (
    <article className="px-4 dk:px-8 py-2 dk:py-4 flex flex-end ">
      {pathname === "/" ? (
        <PageInfo setDisplayHandler={setDisplayHandler} display={display} />
      ) : (
        ""
      )}

      <form
        onSubmit={submitHandler}
        className="ml-auto hidden dk:block bg-surface rounded p-4 border-y border-primary w-[355px]"
      >
        <div className="flex">
          <div className="flex items-center ">
            <SearchIcon sx={{ color: "primary.dark" }} fontSize="medium" />
            <SearchField
              query={query}
              setQuery={setQuery}
              variant="standard"
              placeholder={placeholder}
              sx={{ mr: "1rem" }}
            />
          </div>
          <SearchBtn />
        </div>
      </form>
    </article>
  );
};

export default Searchbar;
