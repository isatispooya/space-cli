import { motion } from "framer-motion";
import { useCorrespondences } from "../hooks";
import toast from "react-hot-toast";
import { CorrespondenceTypes } from "../types";
interface DeleteCorrespondenceProps {
  data: CorrespondenceTypes;
  onClose?: () => void;
}

const DeleteCorrespondence = ({ data, onClose }: DeleteCorrespondenceProps) => {
  const { mutate: deleteCorrespondence, isPending } = useCorrespondences.useDelete();

  const handleDelete = async () => {
    if (!data.id) {
      toast.error("شناسه مکاتبه نامعتبر است");
      return;
    }
    try {
      await deleteCorrespondence(data.id);
      toast.success("مکاتبه با موفقیت حذف شد");
      onClose?.();
    } catch (error) {
      toast.error("خطا در حذف مکاتبه");
      console.error("Error deleting correspondence:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-2xl max-w-md mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center"
      >
        <svg
          className="w-10 h-10 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-gray-900 mb-4"
      >
        حذف مکاتبه
      </motion.h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <p className="text-gray-500 mb-2">
          آیا از حذف این مکاتبه اطمینان دارید؟
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold text-gray-900">{data.subject}</p>
          <p className="text-sm text-gray-500 mt-1">شناسه: {data.id}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          disabled={isPending}
          className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isPending ? (
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              <span>در حال حذف...</span>
            </div>
          ) : (
            "حذف"
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          disabled={isPending}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors duration-200"
        >
          انصراف
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DeleteCorrespondence;
