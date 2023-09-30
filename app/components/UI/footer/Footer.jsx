import React from "react";
import TmdbLogo from "../../../../public/assets/blue_short.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-[3rem] tb:py-[5rem] bg-background flex justify-center items-center mt-auto">
      <p className="mr-[.5rem] font-bold text-[13px] text-surface">
        Powered by
      </p>
      <Link href="https://www.themoviedb.org/">
        <Image
          src={TmdbLogo}
          alt="tmdb logo"
          width={100}
          height={20}
          className="cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default Footer;
