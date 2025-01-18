import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/slider.css";
import { FaShareAlt } from "react-icons/fa";

export interface SlideItem {
  id: number;
  picture: string;
  title: string;
  link: string;
}

interface DashboardSliderProps {
  slides: SlideItem[];
}

const DashboardSlider = ({ slides }: DashboardSliderProps) => {
  const swiperRef = useRef<SwiperClass>();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.autoplay.start();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = async (slide: SlideItem) => {
    try {
      const shareData = {
        title: slide.title,
        text: `${slide.title}\n\nhttps://my.isatispooya.com/underwriting/description`,
        url: `https://my.isatispooya.com/underwriting/description`,
      };

      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } else {
        console.log("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  console.log(slides, "slides");

  return (
    <div className="relative w-full h-full">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={800}
        loop={slides.length > 1}
        className="!absolute inset-0 rounded-lg overflow-hidden"
        initialSlide={0}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="absolute  top-4 right-4 z-10">
              <button
                onClick={() => handleShare(slide)}
                className="flex items-center bg-green-500/10 px-4 py-2 rounded-full"
              >
                <FaShareAlt className="text-base sm:text-lg md:text-xl  text-white  " />
              </button>
            </div>
            <a href={slide.link} className="relative w-full h-full block group">
              <img
                src={slide.picture}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                loading="lazy"
              />

              <div className="absolute inset-0 " />

              <h2 className="absolute top-4 left-0 right-0 mr-4 sm:mr-8 md:mr-16 lg:mr-32 text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 p-2 sm:p-3 md:p-4 z-10">
                {slide.title}
              </h2>

              <div className="absolute hover bottom-0 left-0 right-5 p-4 z-10 text-right">
                <button
                  onClick={() => (window.location.href = slide.link)}
                  className="mb-5 w-full sm:w-3/4  md:w-2/3 lg:w-1/2 py-1 bg-green-600 text-white rounded-lg font-medium text-sm sm:text-base md:text-lg relative block mx-auto"
                >
                  <span className="before:content-['']  before:hidden sm:before:block before:absolute before:left-4 sm:before:left-8 md:before:left-12 font-bold before:top-1/2 before:w-8 sm:before:w-12 md:before:w-16 before:border-t-2 before:border-white before:transform before:-translate-y-1/2 after:content-[''] after:hidden sm:after:block after:absolute after:right-4 sm:after:right-8 md:after:right-12 after:top-1/2 after:w-8 sm:after:w-12 md:after:w-16 after:border-t-2 after:border-white after:transform after:-translate-y-1/2">
                    امکان سرمایه‌گذاری آنلاین
                  </span>
                </button>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DashboardSlider;
