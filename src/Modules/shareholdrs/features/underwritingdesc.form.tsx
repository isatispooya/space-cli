import { FC } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IconType } from "react-icons";

const UnderwritingDescForm: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center ">
      {/* لوگو با افکت‌های جدید */}
      <div className="w-40 h-40 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mb-8 shadow-lg ">
        <span className="text-white text-4xl font-bold tracking-wider">
          SPACE
        </span>
      </div>

      {/* عنوان با افکت تایپوگرافی بهتر */}
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#424769] to-[#2C3333] mb-6 font-iransans">
        خوش آمدید!
      </h1>

      {/* توضیحات با فاصله‌گذاری و استایل بهتر */}
      <p className="text-gray-600 max-w-lg mb-12 leading-relaxed text-lg">
        توضیحات سایت شما در اینجا قرار می‌گیرد. به همه بگویید که چه کاری انجام
        می‌دهید تا بتوانند با شما ارتباط برقرار کنند.
      </p>

      {/* آیکون‌های شبکه‌های اجتماعی با فاصله‌گذاری بهتر */}
      <div className="flex gap-6 mb-12">
        <SocialIcon Icon={FaFacebook} color="from-blue-600 to-blue-400" />
        <SocialIcon Icon={FaInstagram} color="from-pink-500 to-purple-500" />
        <SocialIcon Icon={FaTwitter} color="from-blue-400 to-blue-500" />
      </div>

      {/* بخش تماس با طراحی مدرن‌تر */}
      <div className="w-full max-w-md backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-[#424769] mb-6">
          با ما در تماس باشید
        </h2>
        <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 mb-6">
          تماس با ما
        </button>

        {/* بخش لوکیشن با لینک گوگل مپ */}
        <div className="flex items-center justify-center space-x-2 text-gray-600 group cursor-pointer">
          <FaMapMarkerAlt className="text-2xl text-red-500 group-hover:text-red-600 transition-colors duration-300" />
          <a
            href="https://www.google.com/maps/search/?api=1&query=یزد+بلوار+جمهوری+کوچه+شرق+ساختمان+بورس"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg group-hover:text-gray-800 transition-colors duration-300 mr-2"
          >
            یزد، بلوار جمهوری، کوچه شرق، ساختمان بورس
          </a>
        </div>
      </div>
    </div>
  );
};

// کامپوننت آیکون شبکه‌های اجتماعی با گرادیان
const SocialIcon: FC<{ Icon: IconType; color: string }> = ({ Icon, color }) => (
  <a
    href="#"
    className={`w-12 h-12 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 bg-gradient-to-r ${color} shadow-md`}
  >
    <Icon className="text-white text-xl" />
  </a>
);

export default UnderwritingDescForm;
