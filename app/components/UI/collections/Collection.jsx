"use client";
import { fetcher } from "../../../utils/fetcher";
import useSWR from "swr";
import React from "react";
import Heading from "../heading/Heading";
import CardRegular from "../../cards/CardRegular";
import Loading from "../load/Loading";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Collection = ({
  endpoint,
  href,
  title,
  tag,
  mediaType,
}) => {
  const { data, error } = useSWR(endpoint, fetcher);
  if (error) {
    console.error("Error:", error);
    toast.error('There was an error loading your data... try a refresh?!', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    return <div>Error loading data</div>;
  }


  return (
    <>
      {data ? (
        <section id="homePageCards" className="mx-auto dk:p-4">
          <Heading title={title} tag={tag} href={href} mediaType={mediaType} collType="normal"/>

          <div className="grid grid-cols-2 tb:grid-cols-3 dk:grid-cols-5 gap-y-2 gap-x-2 tb:gap-y-4 tb:gap-x-3 px-4 tb:px-6 dk:px-8 mb-[2rem] bg-background">
            {data.results.slice(0, 10).map((result) => (
              <CardRegular key={result.id} result={result} mediaType={mediaType}/>
            ))}
          </div>

        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Collection;
