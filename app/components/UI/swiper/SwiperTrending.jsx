import React from "react";
import CardTrending from "../../cards/CardTrending";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SwiperTrending = ({ mediaType, data }) => {
  return (
    <>
      <Swiper
        className="w-full h-[285px]  bg-background"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={4}
        navigation={true}
        pagination={{ type: "progressbar" }}
        scrollbar={{ draggable: true, dragSize: "auto", hide: true }}
        breakpoints={{
          650: {
            slidesPerView: 2,
          },
          // 900: {
          //   slidesPerView: 2.5,
          // },
          1200: {
            slidesPerView: 3.25,
          },
        }}
      >
        {data?.results?.slice(0, 20).map((result, index) => (
          <SwiperSlide className="m-0" key={index}>
            <CardTrending
              result={result}
              key={result.id}
              mediaType={mediaType}
            />
             <div className="text-[10rem] text-primary-dark font-bold opacity-50 absolute bottom-[-9%] right-[3%]  z-0">{index + 1}</div> 
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperTrending;
