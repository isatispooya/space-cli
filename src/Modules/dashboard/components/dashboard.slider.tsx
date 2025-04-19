/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";
import { motion } from "framer-motion";

import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/slider.css";
import { FaShareAlt } from "react-icons/fa";
import { useInvitation } from "../../invitation/hooks";
import { useProfile } from "../../userManagment";
import { server } from "@/api/server";
import { Button } from "@/components";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg w-full h-[250px] overflow-hidden transition-shadow duration-300 hover:shadow-xl relative"
    >
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
        className="h-full w-full"
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
                src={server + slide.picture}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-contain object-left rounded-lg"
                loading="lazy"
              />

              <div className="absolute inset-0" />

              <h2 className="absolute top-4 text-2xl left-0 right-0 mx-4 font-bold text-white z-10">
                {slide.title}
              </h2>

              <div className="absolute bottom-20 left-0 right-0 z-10 flex justify-center">
                <Button
                  onClick={() => (window.location.href = slide.link)}
                  variant="custom"
                  size="sm"
                  customColors={{
                    background: "#29D2C7",
                    hoverBackground: "#37f908",
                    text: "white",
                  }}
                  className="w-3/4 py-2 rounded-lg font-medium text-xs"
                >
                  امکان سرمایه‌گذاری آنلاین
                </Button>
              </div>
            </a>
            <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center">
              <Button
                onClick={() => handleShare(slide)}
                variant="custom"
                size="sm"
                customColors={{
                  background: "#ffffff",
                  hoverBackground: "#02205F",
                  text: "green",
                }}
              >
                <FaShareAlt className="text-base text-green-600 mr-1" />
                اشتراک گذاری
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default DashboardSlider;
