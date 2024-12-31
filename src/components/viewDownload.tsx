import { FC } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface ViewDownloadProps {
  title?: string;
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
  title = "پیشرفت پروژه",
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
    }
    toast.success(toastMessage || "در حال دانلود فایل");
  };

  if (!downloadLink) {
    toast.error(toastError || "در حال حاضر فایلی برای دانلود وجود ندارد");
    return null;
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto p-8"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-lg shadow-xl p-8 border border-gray-200 min-h-[800px]"
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
            className="flex items-center justify-between mb-6 mt-6"
          >
            <div className="h-24 relative mr-10">
              <img src={regulatorLogo} alt="لوگوی شرکت" className="w-[180px]" />
            </div>
            <p
              className="text-right text-gray-600 max-w-md ml-20"
              style={{ fontFamily: "Vazirmatn, sans-serif" }}
            >
              {regulatorText}
            </p>
          </motion.div>
          <a href={downloadLink} onClick={handleDownload}>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mx-auto block bg-[#008282] text-white px-8 py-3 rounded-lg 
                   shadow-lg hover:bg-[#008282] transition-colors duration-200"
              style={{ fontFamily: "Vazirmatn, sans-serif" }}
            >
              {downloadButtonText}
            </motion.button>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ViewDownload;
