import { FC } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface ViewDownloadProps {
  title?: string;
  key?: number;
  description: string;
  regulatorLogo: string;
  regulatorText: string;
  downloadLink: string;
  downloadButtonText?: string;
  onDownload?: () => void;
  toastMessage?: string;
  toastError?: string;
}

const ViewDownload: FC<ViewDownloadProps> = ({
  title,
  key,
  description,
  regulatorLogo,
  regulatorText,
  downloadLink,
  downloadButtonText = "دانلود طرح کسب و کار",
  onDownload,
  toastMessage,
  toastError,
}) => {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else if (!downloadLink) {
      toast.error(toastError || "در حال حاضر فایلی برای دانلود وجود ندارد");
    } else {
      toast.success(toastMessage || "در حال دانلود فایل");
    }
  };

  return (
    <div className=" min-h-screen py-8">
      <motion.div
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-3xl mx-auto p-4 sm:p-8"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-lg p-8 sm:p-12 border-2 border-gray-200 relative"
        >
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#5677BC] rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#5677BC] rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#5677BC] rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#5677BC] rounded-br-lg" />

          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center text-3xl font-bold text-[#5677BC] mb-8"
            style={{ fontFamily: "Vazirmatn, sans-serif" }}
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 mb-10 text-right leading-relaxed"
            style={{ fontFamily: "Vazirmatn, sans-serif" }}
          >
            {description}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-10 border-t border-b border-gray-200 py-8"
          >
            <img
              src={regulatorLogo}
              alt="لوگوی شرکت"
              className="w-[150px] object-contain"
            />
            <p
              className="text-right text-gray-700 flex-1"
              style={{ fontFamily: "Vazirmatn, sans-serif" }}
            >
              {regulatorText}
            </p>
          </motion.div>

          {downloadLink && (
            <div className="w-full text-center">
              <a href={downloadLink} onClick={handleDownload}>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#5677BC] text-white px-10 py-3 rounded-md
                    shadow-md hover:bg-[#4666AB] transition-colors duration-200"
                  style={{ fontFamily: "Vazirmatn, sans-serif" }}
                >
                  {downloadButtonText}
                </motion.button>
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ViewDownload;
