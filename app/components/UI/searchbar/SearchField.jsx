import React from "react";
import { TextField } from "@mui/material";

const SearchField = ({ placeholder, setQuery, query }) => {
  return (
    <>
      <TextField
        fullWidth
        variant="standard"
        placeholder={placeholder}
        sx={{ mx: "1rem" }}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        type="text"
      />
    </>
  );
};

export default SearchField;
