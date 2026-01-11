import { Card } from "./card";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";


export function Slider({ data }) {

  return (
    <div className="bg-[rgb(0,0,0)] flex justify-center">
      {/* <h1 className="px-[20px] py-[10px]">trending movies</h1> */}
      <div className="px-[20px] w-[90vw]">
        <Swiper
          spaceBetween={10}
          navigation={true}
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          grabCursor={true}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
            1440: {
              slidesPerView: 6,
            },
          }}
        >
          {data.map((movie) => (
            <SwiperSlide className="py-[20px]" >
              <Card key={movie.id} movie={movie}
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </div>

  )
}