import React from "react";
import BookmarkIcon from "../icons/BookmarkIcon";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

const NavBookmarkBtn = ({ disabled, bookmarkedCards }) => {
  return (
    <>
      <div
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Sign in to bookmark"
      >
        <IconButton
          sx={{ padding: { md: "1rem" } }}
          size="large"
          disabled={!disabled}
        >
          <Link href="/bookmarked" passHref>
            <div className="relative">
              <BookmarkIcon disabled={disabled} />
              {bookmarkedCards.length > 1 ? (
                <div className="flex items-center justify-center bg-green-500 text-surface text-[.8rem] absolute top-[15%] right-[5%] w-[15px] h-[15px] rounded-full p-2 ">
                  {bookmarkedCards.length - 1}
                </div>
              ) : (
                ""
              )}
            </div>
          </Link>
        </IconButton>
      </div>
    </>
  );
};

export default NavBookmarkBtn;
