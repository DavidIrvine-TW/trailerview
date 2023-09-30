import React from "react";
import MainPageTV from "@/app/components/UI/movie_tv_page/MainPageTV";

const Page = ({ params }) => {
  return (
    <main>
      <MainPageTV params={params} />
    </main>
  );
};

export default Page;
