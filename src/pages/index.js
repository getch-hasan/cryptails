import Cart from "@/components/cart";
import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Import Navigation from 'swiper/modules'
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { publicRequest } from "@/config/axios.config";
import { CartSkeleton } from "@/components/skeleton";
import { CiVideoOn } from "react-icons/ci";
import { FaExplosion } from "react-icons/fa6";
import HomeModal from "@/components/homeModal";
import RegulerMenu from "@/components/regulerMenu";
import AboutUsSection from "@/components/about";
import OpenHoursSection from "@/components/open";
import ContactSection from "@/components/contact";
import OfferBanner from "@/components/offer";

export default function Home() {
  const swiperRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [detail, setDetail] = useState({});
  const [isOpenWatchVideo, setIsOpenWatchVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Close the modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpenWatchVideo(false);
    }
  };

  // Close the modal on page refresh (you can use useEffect for this)
  useEffect(() => {
    setIsOpenWatchVideo(false); // Will close the modal when the page is refreshed
  }, []);


  const handleModal = async (id) => {
    setModal(true); // Open modal immediately

    try {
      const res = await publicRequest.get(`cook/${id}`);
      setDetail(res?.data?.data);
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };
  const closeModal = () => {
    setModal(false);
    setDetail([]);
  };
// fethc populer Food
const [populerFood, setPopulerFood] = useState([]);
  const fetchPopulerFood = useCallback(async () => {
    setRegLoading(true);
    try {
      const res = await publicRequest.get("popular");
      if (res.status === 200) {
        setPopulerFood(res?.data?.data);
        console.log(res?.data?.data);
        setRegLoading(false);
      }
    } catch (error) {}
  }, []);

// feth foood
  const fetchFood = useCallback(async () => {
    setRegLoading(true);
    try {
      const res = await publicRequest.get("cook");
      if (res.status === 200) {
        SetFood(res?.data?.data?.data);
        setRegulerFood(res?.data?.data?.data);
        setRegLoading(false);
      }
    } catch (error) {}
  }, []);
  // Fetch Chef=======================================================
  const [chefs, SetChefs] = useState([]);
  const fetchChefs = useCallback(async () => {
    try {
      const res = await publicRequest.get("chef");
      if (res.status === 200) {
        SetChefs(res?.data?.data);
      }
    } catch (error) {}
  }, []);
  useEffect(() => {
    fetchFood();
    fetchChefs();
    fetchPopulerFood();
  }, []);

  
  return (
    <div className="container-custom mx-auto pt-16">
      {/* hero section */}
      <section
        id="#"
        className="flex  flex-col lg:flex-row justify-between items-center  "
      >
        <div className="py-5 w-full lg:w-1/2">
          <h1 className="text-5xl font-bubblegum text-bold">
            We serve the test You love 😍
          </h1>
          <p className="pt-10 font-openSans">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            temporibus asperiores excepturi sapiente ipsa hic! Voluptas, nobis.
            Soluta iste labore ratione cumque necessitatibus. Id accusantium
            tempore quo assumenda! Quisquam, natus.
          </p>
          <div className="flex  gap-5 pt-10">
            <div className="flex items-center gap-2 rounded-md text-sm text-gray-800 font-bold bg-primary px-5 py-2 shadow-xl overflow-hidden">
              <FaExplosion className="text-2xl" />
              {/* <PrimaryButton name="Explore Food" link="#manu" /> */}
              <p className="text-md">Explore Foods</p>
            </div>

            <button
              className="flex items-center gap-2"
              onClick={() => setIsOpenWatchVideo(true)}
            >
              <CiVideoOn className="text-3xl" />{" "}
              <p className="text-1xl">Watch Video</p>
            </button>
          </div>
        </div>

        {/* watch video Modal */}
        {isOpenWatchVideo && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleOutsideClick}
          >
            <div className="rounded-lg shadow-lg w-[90%] max-w-4xl relative">
              {/* Close Button */}
              {/* <button
                className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-500"
                onClick={() => setIsOpenWatchVideo(false)}
              >
                &times;
              </button> */}

              {/* Embedded YouTube Video */}
              <div className="w-full">
                <iframe
                  className="w-full h-[500px] rounded-md"
                  src="https://www.youtube.com/embed/X_lhcF1W8nc?si=TsdoOS7xi3NCyZ7r"
                  title="YouTube video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

        <div className="relative flex items-center justify-center lg:pe-20  py-10 lg:py-20">
          <Image
            className=" border-none"
            height={500}
            width={500}
            src="/images/food1.png"
            alt="hero"
          />
        </div>
      </section>

     <AboutUsSection/>
    
      {/* Populer dishesh seciton start from hare */}
      <div
        className={`${isHovered ? "overflow-hidden" : "overflow-auto"}`}
        
      >
        <section
          className="py-10"
          onMouseEnter={() => setIsHovered(true)} // Disable swiper on hover
          onMouseLeave={() => setIsHovered(false)} // Enable swiper when cursor leaves
        >
          <div className="flex justify-between items-center py-10">
            <h1 className="text-4xl font-bold font-bubblegum">
              Popular Dishes
            </h1>
            <div className="lg:flex hidden gap-4">
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="border border-primary rounded-full p-2 hover:bg-primary hover:shadow-xl"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="border border-primary rounded-full p-2 hover:bg-primary hover:shadow-xl"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          <Swiper
            className="w-full mx-auto"
            spaceBetween={20}
            loop={true}
            speed={2000}
            modules={[Autoplay]}
            autoplay={isHovered ? false : { delay: 1000 }} // Conditionally set autoplay
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            <div>
              {populerFood?.length > 0
                ? populerFood?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <Cart handleModal={handleModal} food={item} />
                    </SwiperSlide>
                  ))
                : // Skeleton Loader
                  Array.from({ length: 5 }).map((_, index) => (
                    <SwiperSlide key={index}>
                      <CartSkeleton />
                    </SwiperSlide>
                  ))}
            </div>
          </Swiper>
        </section>
      </div>

      {/* service section */}
  
      {/* Reguler menu section */}
     <RegulerMenu/>
      {/* Reservation sectoion */}
      {/* <section id="reserve" className=" flex pt-16 flex-col md:flex-row justify-center items-center lg:gap-4 ">
        <div className="py-5 w-full md:w-1/2">
          <h1 className="text-5xl font-bubblegum text-bold">
            Do You Have Any Dinner Plan Today? Resrve Your Table Today
          </h1>
          <p className="pt-10 font-openSans">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            temporibus asperiores excepturi sapiente ipsa hic! Voluptas, nobis.
            Soluta iste labore ratione cumque necessitatibus.
          </p>
          <div className="flex  gap-5 pt-10">
            <PrimaryButton name="Make Reservation" link="#reserve" />
          </div>
        </div>
        <div className="py-10 flex justify-center">
          <Image
            className="rounded-full h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] object-fit"
            height={500}
            width={500}
            src={"/images/burger.webp"}
            alt="hero"
          />
        </div>
      </section> */}
      {/* our chef */}
      
      {/* customer say=================================== */}
      {/* <section id="reviews" className="pt-16">
        <div className="flex justify-between items-center py-10">
          <h1 className="text-4xl font-bold font-bubblegum">
            What Our Customer Sayes
          </h1>
          <div className="lg:flex  gap-4 hidden  ">
            <button
              onClick={() => swiperRef2.current?.slideNext()}
              className="border border-primary rounded-full p-2 hover:bg-primary hover:shadow-xl"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => swiperRef2.current?.slidePrev()}
              className="border border-primary rounded-full p-2 hover:bg-primary hover:shadow-xl"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <Swiper
          className="w-full mx-auto"
          spaceBetween={20}
          dir="LTR"
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={4000}
          modules={[Autoplay]} // Include Navigation in modules
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          onSwiper={(swiper) => (swiperRef2.current = swiper)}
        >
          {[...Array(5)].map((_, index) => (
            <SwiperSlide key={index}>
              <div className=" bg-[#f3dede] rounded-xl p-5">
                <p className="font-openSans">
                  " Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quas, facilis? Nulla amet soluta quis dolor labore eos,
                  excepturi consequuntur eaque, dignissimos rem aliquam!
                  Perspiciatis nobis sapiente quaerat ab suscipit voluptate!"
                </p>
                <div className="flex justify-start items-center mt-5 ">
                  <Image
                    height={50}
                    width={50}
                    src={"/images/chef.webp"}
                    className="rounded-full h-16 w-16"
                    alt="name"
                  />
                </div>
                <p className="text-start  font-bubblegum leading-5 text-xl mt-4">
                  MR. Chef
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section> */}
      {/* details modal section */}
      <OfferBanner/>
<OpenHoursSection/>
<ContactSection/>
      
      {modal && (
            <HomeModal detail={detail} closeModal={closeModal}/>
      )}
    </div>
  );
}
