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
        className="w-full dk:h-[350px] h-[250px] rounded bg-primary-light"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={2}
        navigation={true}
        pagination={{ type: "progressbar" }}
        scrollbar={{ draggable: true, dragSize: "auto", hide: true }}
        breakpoints={{
          600: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2.75,
          },
        }}
      >
        {data?.results?.slice(0, 8).map((result, index) => (
          <SwiperSlide className="m-0" key={index}>
            <CardTrending
              result={result}
              key={result.id}
              mediaType={mediaType}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperTrending;
