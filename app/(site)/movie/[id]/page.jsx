import React from "react";
import MainPage from "@/app/components/UI/movie_tv_page/MainPage";

const page = ({params}) => {
  return (
    <main>
      <MainPage params={params}/>
    </main>
  );
};

export default page;
