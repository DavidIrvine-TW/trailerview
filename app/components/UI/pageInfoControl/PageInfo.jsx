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
      <div className="flex items-center text-center">
        <p className="text-surface">
          <span className="font-bold">Welcome:</span> {session ?  (session.user.email) : ( 'sign in to create a list')} 
        </p>
      </div>
      <div className="flex flex-row gap-[2rem] text-body py-2">
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
