import React, { useState, useEffect, useRef } from "react";
import {
  GoogleLoginButton,
  GithubLoginButton,
  FacebookLoginButton,
  // InstagramLoginButton,
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
          <li className="text-left text-surface text-body-sm">
            <p>Log in </p>
          </li>
          <li onClick={(e) => signInHandler("google", e)}>
            <GoogleLoginButton text="Google" />
          </li>
          <li onClick={(e) => signInHandler("github", e)}>
            <GithubLoginButton text="GitHub" />
          </li>
          <li onClick={(e) => signInHandler("facebook", e)}>
            <FacebookLoginButton text="Facebook" />
          </li>
          {/* <li onClick={(e) => signInHandler("instagram", e)} disabled={true}>
            <InstagramLoginButton text="Instagram" />
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default SignInBtn;
