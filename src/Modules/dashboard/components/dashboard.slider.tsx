import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/slider.css";

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

  if (!slides || slides.length === 0) {
    return null;
  }

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
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <a href={slide.link} className="relative w-full h-full block group">
              <img
                src={slide.picture}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                loading="lazy"
              />

              <div className="absolute inset-0 " />

              <h2 className="absolute top-4 left-0 right-0 mr-32 text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 p-4 z-10">
                {slide.title}
              </h2>

              <div className="absolute bottom-0 left-0 right-5 p-4 z-10">
                <button className="mb-5 px-48 py-1 bg-green-600 text-white rounded-lg font-medium text-lg relative block mr-32">
                  <span className="before:content-[''] before:block before:absolute before:left-12 font-bold before:top-1/2 before:w-1/6 before:border-t-2 before:border-white before:transform before:-translate-y-1/2 after:content-[''] after:block after:absolute after:right-12 after:top-1/2 after:w-1/6 after:border-t-2 after:border-white after:transform after:-translate-y-1/2">
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
