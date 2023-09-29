import React from "react";

function Info({ data, mediaType }) {

  const renderLanguage = (spokenLanguages) => {
    if (spokenLanguages == 'en') {
      return 'English';
    } else {
      return 'N/A';
    }
  };

  function renderYear(year) {
    if (!year) {
      return 'N/A'
    } else {
      return year.substring(0, 4)
    }
  }

   function renderStatus(status) {
    if (!status) {
      return 'N/A'
    } else {
      return status
    }
  }

  console.log(data);

  return (
    <>
      {mediaType === "movie" ? (
        <article className="flex dk:items-start items-center justify-between text-left text-sm px-4 dk:px-0 dk:text-body-md max-w-[1000px] dk:mx-auto">
          <div className="dk:flex-col gap-[1rem]">
            <p className="mb-1 text-app-placeholder font-bold">Length:</p>
            <p className="text-app-pure-white">{data.movieDetail.runtime} mins</p>
          </div>
          <div className="dk:flex-col gap-[1rem]">
            <p className="mb-1 text-app-placeholder font-bold">Language:</p>
            <p className="text-app-pure-white">{renderLanguage(data.movieDetail.original_language)}</p>
          </div>
          <div className="dk:flex-col gap-[1rem]">
            <p className="mb-1 text-app-placeholder font-bold">Year:</p>
            <p className="text-app-pure-white">{renderYear(data.movieDetail.release_date)}</p>
          </div>
          <div className="dk:flex-col gap-[1rem]">
            <p className="mb-1 text-app-placeholder font-bold">Status:</p>
            <p className="text-app-pure-white">{renderStatus(data.movieDetail.status)}</p>
          </div>
        </article>
      ) : (
        <article className="flex dk:items-start items-center justify-between text-left text-sm px-4 dk:px-0 dk:text-body-md max-w-[1000px] dk:mx-auto">
          <div className="dk:flex gap-[1rem]">
            <p className="mb-1 text-app-placeholder font-bold">Language</p>
            <p className="text-app-pure-white">{renderLanguage(data.tvDetail.spoken_language)}</p>
          </div>
          <div className="dk:flex gap-[1rem]">
            <p className="mb-1 text-app-placeholder font-bold">First Air</p>
            <p className="text-app-pure-white">{data.tvDetail.first_air_date}</p>
          </div>
          <div className="dk:flex gap-[1rem]">
            <p className="mb-1 text-app-placeholder font-bold">Last Air</p>
            <p className="text-app-pure-white">{data.tvDetail.last_air_date}</p>
          </div>
          <div className="dk:flex gap-[1rem]">
            <p className="mb-1 text-app-placeholder font-bold">Status</p>
            <p className="text-app-pure-white">{data.tvDetail.status}</p>
          </div>
        </article>
      )}
    </>
  );
}

export default Info;
