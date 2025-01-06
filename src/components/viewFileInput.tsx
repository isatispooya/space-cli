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
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-4">
        {showPreview && fileType?.startsWith("image/") && (
          <img
            src={url}
            alt={label}
            className="w-20 h-20 object-cover rounded-lg"
          />
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleView}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          مشاهده فایل
        </motion.button>
      </div>
    </div>
  );
};

export default ViewFileInput;
