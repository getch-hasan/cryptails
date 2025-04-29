import { publicRequest } from '@/config/axios.config';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from 'next/image';
const Chef = () => {
  const [chefs, SetChefs] = useState([]);
  const swiperRef1 = useRef(null);
  const fetchChefs = useCallback(async () => {
    try {
      const res = await publicRequest.get("chef");
      if (res.status === 200) {
        SetChefs(res?.data?.data);
      }
    } catch (error) {}
  }, []);
  useEffect(()=>{
    fetchChefs()
  },[])
  return (
    <section id="chef" className="pt-24  py-10 container-custom">
    <div className="flex justify-between items-center py-10 ">
      <h1 className="text-4xl font-bold font-bubblegum">Meet Our Chefs</h1>
      <div className="lg:flex gap-4 hidden">
        <button
          onClick={() => swiperRef1.current?.slideNext()}
          className="border border-primary rounded-full p-2 hover:bg-primary hover:shadow-xl"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => swiperRef1.current?.slidePrev()}
          className="border border-primary rounded-full p-2 hover:bg-primary hover:shadow-xl"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
    <Swiper
      className="w-full mx-auto"
      spaceBetween={20}
      dir="ltr"
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={2000}
      modules={[Autoplay]} // Include Navigation in modules
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      onSwiper={(swiper) => (swiperRef1.current = swiper)}
    >
      {chefs?.length > 0
        ? chefs.map((data) => (
            <SwiperSlide key={data?.chef_id}>
              <div className="bg-white rounded-xl p-5 flex flex-col justify-between h-[400px]">
                <div className="flex justify-center items-center">
                  <Image
                    height={250}
                    width={250}
                    src={`${process.env.NEXT_PUBLIC_API_SERVER}/${data?.chef_image}`}
                    className="rounded-xl object-cover"
                    alt={data?.chef_name}
                  />
                </div>
                <div className="text-center">
                  <p className="font-bubblegum leading-5 text-xl text-primary mt-2">
                    {data?.chef_name}
                  </p>
                  <p className="font-bubblegum leading-5 text-xl mt-2">
                    {" "}
                    Designation: {data?.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))
        : Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl p-5 flex flex-col justify-between h-[400px] shadow-lg">
                {/* Image Skeleton */}
                <div className="flex justify-center items-center">
                  <div className="w-[250px] h-[300px] bg-gray-200 animate-pulse rounded-xl"></div>
                </div>

                {/* Text Skeleton */}
                <div className="text-center">
                  <div className="w-2/3 h-6 bg-gray-200 animate-pulse mx-auto rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-200 animate-pulse mx-auto mt-2 rounded"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
    </Swiper>
  </section>
  );
};

export default Chef;