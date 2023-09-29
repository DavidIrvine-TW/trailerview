"use client";
import NavBookmarkBtn from "../../buttons/NavBookmarkBtn";
import NavHomeBtn from "../../buttons/NavHomeBtn";
import NavMovieBtn from "../../buttons/NavMovieBtn";
import NavTVBtn from "../../buttons/NavTVBtn";
import NavLogoBtn from "../../buttons/NavLogoBtn";
;
import { useRouter } from "next13-progressbar";
import { useBookmarkContext } from "../../../context/BookmarkContext";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Tooltip } from "react-tooltip";
import SignInBtn from "../../buttons/SignInBtn";
import SignOutBtn from "../../buttons/SignOutBtn";

const Navbar = () => {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [isSession, setIsSession] = useState(!!session);

  const router = useRouter();
  const { bookmarkedCards } = useBookmarkContext();

  const handleScroll = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  };

  useEffect(() => {
    const scrollWatcher = document.querySelector("[data-scroll-watcher]");
    const headerObserver = new IntersectionObserver(handleScroll, {
      root: null, // Use the viewport as the root
      rootMargin: "170px",
      threshold: 0, // Trigger when the scroll watcher is in the viewport
    });

    if (scrollWatcher) {
      headerObserver.observe(scrollWatcher);
    }

    // Clean up the observer when the component unmounts
    return () => {
      headerObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    router.push("/");
  }, [session]);

  // console.log(session?.user.email)
  

  return (
    <>
      <div data-scroll-watcher />
      <header
        className={`${
          scrolled ? "" : "sticky top-0 z-20 "
        }  primary-header bg-background `}
      >
        <nav className="wrapper flex items-center justify-between p-4 dk:py-[0] rounded-sm min-w-[375px] max-w-[1920px] pr-[.5rem] dk:pr-[1rem] shadow-md">
          <div className="dk:flex items-center">
            <NavLogoBtn />
            <span className="tracking-in-expand font-bold text-heading-md upprecase hidden dk:inline-flex text-surface">
              Marv.Dev
            </span>
          </div>
          <div className="flex items-center ">
            <ul className="flex gap-[.5rem] tb:gap-[1.5rem] items-center">
              <NavHomeBtn />
              <NavMovieBtn />
              <NavTVBtn />
              <NavBookmarkBtn disabled={isSession} bookmarkedCards={bookmarkedCards}/>
              {session ? "" : <Tooltip id="my-tooltip" />}
            </ul>

            {session?.user ? (
              <SignOutBtn
                session={session}
              />
            ) : (
              <SignInBtn />
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;