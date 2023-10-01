import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";
import { signIn } from "next-auth/react";

const SignInBtn = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuStyles = isOpen ? "visible active" : "invisible inactive";
  const signInFeedback = isLoading ? "working " : "Sign in";
  const flashText = isLoading ? "flashing-text" : "";
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

  const openSignInMenuHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const signInHandler = async (provider, e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsOpen((prev) => !prev);
    await signIn(provider);
    setIsLoading(false);
  };


  // guest sign in
  // const handleGuestSignIn = async () => {
  //   try {
  //     await signIn("credentials", {
  //       username: "guest",
  //     });
  //     // window.location.href = "/";
  //   } catch (error) {
  //     console.error("Guest sign-in failed:", error);
  //     // Handle any errors here
  //   }
  // };

  return (
    <div className="relative z-10">
      <button
        className={`${flashText} text-surface shadow-md rounded-lg px-2 mx-[.5rem] dk:mr-[1rem] dk:ml-[5rem] hover:underline`}
        onClick={openSignInMenuHandler}
      >
        {signInFeedback}
      </button>

      <div
        id="dropdown-menu"
        ref={menuRef}
        className={`${menuStyles} dropdown-menu bg-background border border-surface rounded w-[225px] absolute z-10 top-[2.5rem] right-[0rem]`}
      >
        <ul className="w-500px p-2 flex flex-col gap-[.3rem]">
          <li className="text-left text-surface text-body-sm px-[10px]">
            <p>Create account to save and retrieve bookmarks across your devices</p>
          </li>
          <li onClick={(e) => signInHandler("google", e)}>
            <GoogleLoginButton text="Google" />
          </li>
          <li onClick={(e) => signInHandler("github", e)}>
            <GithubLoginButton text="GitHub" />
          </li>
          {/* guest sign in button */}
          {/* <li>
            <button
              className="flex flex-row items-center justify-items-center gap-[.5rem] rounded w-[197px] h-[50px] border border-surface m-[5px] px-[10px] text-surface font-bold hover:bg-primary hover:text-background"
              onClick={handleGuestSignIn}
            >
              <div className="w-[26px] h-[26px]">
              <Image src="https://i.pinimg.com/736x/6f/a0/c8/6fa0c8345cab7c10241a2ea863f5c5ea.jpg" width={26} height={26} className="rounded-full"/>

            </div>
              
              Guest login
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default SignInBtn;
