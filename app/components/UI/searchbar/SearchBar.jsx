"use client";
import React, { useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import SearchField from "./SearchField";
import SearchBtn from "../../buttons/SearchBtn";
import { useRouter } from "next/navigation";

const Searchbar = ({ mediaType, placeholder, searchPath }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

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
    <section className="m-4 dk:hidden bg-surface">
      <form
        onSubmit={submitHandler}
        className="flex justify-between items-center"
      >
        <div className="flex items-center flex-grow">
          <SearchIcon sx={{ color: "primary.dark" }} fontSize="medium" />
          <SearchField
            query={query}
            setQuery={setQuery}
            fullWidth
            variant="standard"
            placeholder={placeholder}
            sx={{ mx: "1rem" }}
          />
        </div>
        <SearchBtn />
      </form>
    </section>
  );
};

export default Searchbar;
