import { motion } from "framer-motion";

const ViewFileInput: React.FC<{
  url?: string;
  label: string;
  fileType?: string;
  showPreview?: boolean;
}> = ({ url, label, fileType, showPreview = true }) => {
  if (!url) return null;

  const handleView = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full max-w-sm min-w-[160px] mt-1">
      {label && (
        <label className="block text-sm font-medium text-slate-500 mb-1">
          {label}
        </label>
      )}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleView}
        className="relative w-full bg-blue-100 text-blue-700 text-sm border border-blue-300 rounded px-4 py-2 transition duration-300 ease hover:border-blue-400 shadow-sm cursor-pointer flex items-center"
      >
        {showPreview && fileType?.startsWith("image/") && (
          <img
            src={url}
            alt={label}
            className="w-20 h-20 object-cover rounded-lg mr-2"
          />
        )}
        <span className="truncate">مشاهده فایل</span>
      </motion.div>
    </div>
  );
};

export default ViewFileInput;
