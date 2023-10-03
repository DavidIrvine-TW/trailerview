"use client";
import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useSession } from "next-auth/react";

const PageInfo = ({ setDisplayHandler, display }) => {
  const {data: session} = useSession()
  const handleChange = (event, newAlignment) => {
    setDisplayHandler(!display);
  };

  return (
    <div>
      <div className="flex justify-between items-center text-center">
        <p className="text-primary mb-[.5rem]">
          <span className="font-bold">Welcome:</span> {session ?  (session.user.email) : ( 'Not signed in')} 
        </p>
      </div>
      <div className="flex flex-row gap-[2rem] text-body pt-4">
        <ToggleButtonGroup
          color="primary"
          value={display}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton
            value={true}
            sx={{
              color: "gray",
              border: "1px solid gray",
              paddingY: "0px",
              "&.Mui-selected": {
                color: "green",
              },
            }}
          >
            TV
          </ToggleButton>
          <ToggleButton
            value={false}
            sx={{
              color: "gray",
              border: "1px solid gray",
              paddingY: "0px",
              "&.Mui-selected": {
                color: "green",
              },
            }}
          >
            MOVIE
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default PageInfo;
