import React from "react";
import MainPage from "@/app/components/UI/movie_tv_page/MainPage";

const Page = ({params}) => {
  return (
    <main>
      <MainPage params={params}/>
    </main>
  );
};

export default Page;
