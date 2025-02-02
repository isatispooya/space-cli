/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";

import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/slider.css";
import { FaShareAlt } from "react-icons/fa";
import { useInvitation } from "../../invitation/hooks";
import { useProfile } from "../../userManagment";

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

  const { data: invitation } = useInvitation.useGetCodes();
  const { data: profile } = useProfile();



  const filteredInvitationCode = useMemo(() => {
    if (!Array.isArray(invitation) || !profile?.uniqueIdentifier) {
      return null;
    }

    const foundInvitation = invitation.find(
      (item) =>
        item.introducer_user_detail?.uniqueIdentifier ===
        profile.uniqueIdentifier
    );

    return foundInvitation ? foundInvitation.code : null;
  }, [invitation, profile]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.autoplay.start();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  const handleShare = async (slide: SlideItem) => {
    const code = filteredInvitationCode;

    if (!code) {
      console.error("Invitation code is undefined");
      return;
    }

    try {
      const shareData = {
        title: slide.title,
        text: `${slide.title}\n\nmy.isatispooya.com/login?rf=${code}`,
        url: `my.isatispooya.com/login?rf=${code}`,
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
            <a className="relative w-full h-full block group">
              <img
                src={slide.picture}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-contain object-left rounded-lg"
                loading="lazy"
              />

              <div className="absolute inset-0 " />

              <h2 className="absolute top-4 left-0 right-0 mx-4 sm:mx-8 md:mx-8 lg:mx-32 text-base sm:text-sm md:text-xl lg:text-3xl font-bold text-white mb-1 p-2 sm:p-3 md:p-4 z-10">
                {slide.title}
              </h2>

              <div className="absolute hover bottom-4 sm:bottom-4 md:bottom-2 lg:bottom-0 left-0 right-5 p-4 md:p-2 z-10 text-right flex justify-center">
                <button
                  onClick={() => (window.location.href = slide.link)}
                  className="mb-5 w-full sm:w-3/4 md:w-2/4 lg:w-1/2 py-2 bg-green-600 text-white rounded-lg font-medium text-xs sm:text-sm md:text-sm lg:text-lg relative block mx-auto"
                >
                  <span className="before:content-['']  before:hidden sm:before:block before:absolute before:left-4 sm:before:left-8 md:before:left-12 font-bold before:top-1/2 before:w-8 sm:before:w-12 md:before:w-12 before:border-t-2 before:border-white before:transform before:-translate-y-1/2 after:content-[''] after:hidden sm:after:block after:absolute after:right-4 sm:after:right-8 md:after:right-12 after:top-1/2 after:w-8 sm:after:w-12 md:after:w-12 after:border-t-2 after:border-white after:transform after:-translate-y-1/2">
                    امکان سرمایه‌گذاری آنلاین
                  </span>
                </button>
              </div>
            </a>

            <div className="absolute bottom-2 right-0 left-0 lg:left-5 lg:right-5 lg:bottom-2 md:bottom-2 md:left-4 md:right-4 sm:left-3 sm:right-3 z-10 flex justify-center lg:justify-start md:justify-start sm:justify-start ">
              <button
                onClick={() => handleShare(slide)}
                className="flex items-center bg-white px-3 py-1 rounded-full tour-share-dashboard cursor-pointer"
              >
                <FaShareAlt className="text-base sm:text-lg md:text-xl text-green-600" />
                اشتراک گذاری
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DashboardSlider;
