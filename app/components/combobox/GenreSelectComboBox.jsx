"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const GenreSelectComboBox = ({ data, setGenreSelected }) => {
  //covert data to work with autocomplete
  const genresData = Array.isArray(data.genres) ? data.genres : [];
  const genresOptions = genresData.map((genre) => ({
    label: genre.name,
    id: genre.id,
  }));

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={genresOptions}
      getOptionLabel={(option) => option.label}
      sx={{ width: "170px", backgroundColor: "#fafafa", borderRadius: "5%" }}
      onChange={(event, newValue) => {
        setGenreSelected(newValue);
      }}
      renderInput={(params) => (
        <TextField
          sx={{ width: "100%", color: "secondary" }}
          {...params}
          label={"Select"}
        />
      )}
    />
  );
};

export default GenreSelectComboBox;
