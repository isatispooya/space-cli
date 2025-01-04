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

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 bg-white text-black rounded-lg font-medium">
                  مشاهده بیشتر
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">
                  {slide.title}
                </h2>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DashboardSlider;
