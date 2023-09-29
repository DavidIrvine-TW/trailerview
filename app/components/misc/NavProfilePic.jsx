import React from "react";
import Image from "next/image";

const NavProfilePic = ({avatar}) => {
  return (
    <>
      <Image
        src={avatar}
        alt="profile picture"
        width={40}
        height={40}
        style={{border: '2px solid #0F172A', borderRadius: '50%'}}
        className="dk:w-[35px] dk:h-[35px]"
      />
    </>
  );
};

export default NavProfilePic;