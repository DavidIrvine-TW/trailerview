import React, { useState, useEffect, useRef } from "react";
import NavProfilePic from "../misc/NavProfilePic";
import { signOut } from "next-auth/react";
import { useBookmarkContext } from "../../context/BookmarkContext";

const SignOutBtn = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [savingBookmarks, setSavingBookmarks] = useState(false);
  const { bookmarkedCards } = useBookmarkContext();
  const menuStyles = isOpen ? "visible active" : "invisible inactive";
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const openSignOutMenuHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const signOutAndSaveBookmarks = async (e) => {
    if (bookmarkedCards.length >= 1) {
      setSavingBookmarks(true);
      try {
        const response = await fetch("/api/savebookmarks", {
          method: "POST",
          headers: {
            "Content-type": "application/JSON",
          },
          body: JSON.stringify({
            bookmarks: bookmarkedCards,
            userEmail: session.user.email,
          }),
        });
        const { message } = await response.json();
        console.log(message);
      } catch (error) {
        console.log("ERROR DURING BLAH BLAH", error);
      }
      setSavingBookmarks(false);
    }

    setSigningOut(true);
    signOut();
    setSigningOut(false);
  };

  return (
    <div className="relative">
      <div
        onClick={openSignOutMenuHandler}
        className="dk:w-[40px] dk:h-[40px] mx-[.5rem] dk:mr-[1rem] dk:ml-[5rem] cursor-pointer"
      >
        {session?.user?.image ? (
          <NavProfilePic avatar={session.user.image} />
        ) : (
          <button>Sign Out</button>
        )}
      </div>

      <div
        id="dropdown-menu"
        ref={menuRef}
        className={`${menuStyles} dropdown-menu bg-background shadow-md border border-surface rounded w-min-content absolute z-10 top-[3rem] right-[0rem] p-2`}
      >
        <ul className="p-2 flex flex-col gap-[.5rem] text-surface">
          <li onClick={() => {}}>
            <p className="truncate text-ellipsis text-primary text-body-sm">
              {session.user.email}
            </p>
          </li>
          <li>
            {savingBookmarks ? (
              <p className="text-green-500 flashing-text">Updating bookmarks</p>
            ) : (
              <p>
                Bookmarks{" "}
                <span className="font-bold text-green-500">
                  {bookmarkedCards?.length - 1}
                </span>
              </p>
            )}
          </li>
          <li
            className="cursor-pointer hover:underline"
            onClick={signOutAndSaveBookmarks}
          >
            {signingOut ? (
              <p className="text-green-500 flashing-text">Signing out</p>
            ) : (
              <p>Sign out</p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SignOutBtn;
