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
    <div>
      <motion.div
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl mx-auto p-4 sm:p-8"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-lg shadow-xl p-4 sm:p-8 border border-gray-200 min-h-[600px]"
          style={{
            backgroundImage:
              "linear-gradient(0deg, #f9fafb 2px, transparent 2px)",
            backgroundSize: "100% 2rem",
            boxShadow: "0 0 20px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.05)",
          }}
        >
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-right text-3xl font-bold text-[#5677BC] mb-6"
            style={{ fontFamily: "Vazirmatn, sans-serif" }}
          >
            {title}
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 mb-8 text-right"
            style={{ fontFamily: "Vazirmatn, sans-serif" }}
          >
            {description}
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8"
          >
            <div className="flex items-center gap-4 w-full sm:w-1/2">
              <img
                src={regulatorLogo}
                alt="لوگوی شرکت"
                className="w-[120px] sm:w-[180px] object-contain"
              />
            </div>
            <p
              className="text-right text-gray-600 w-full sm:w-1/2"
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#008282] text-white px-8 py-3 rounded-lg 
                    shadow-lg hover:bg-[#008282] transition-colors duration-200"
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
