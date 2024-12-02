import { motion } from "framer-motion";
import { CorrespondenceData } from "../types";

interface SeeCorrespondenceProps {
  data: CorrespondenceData;
}

const SeeCorrespondence = ({ data }: SeeCorrespondenceProps) => {
  const fields = [
    { label: "عنوان", value: data.title },
    { label: "فرستنده", value: data.sender },
    { label: "گیرنده", value: data.receiver },
    { label: "تاریخ", value: data.date },
    { label: "موضوع", value: data.subject },
    { label: "شماره مرجع", value: data.reference_number },
    { label: "دسته‌بندی", value: data.category },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'received':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return 'ارسال شده';
      case 'received':
        return 'دریافت شده';
      case 'draft':
        return 'پیش‌نویس';
      default:
        return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'زیاد';
      case 'medium':
        return 'متوسط';
      case 'low':
        return 'کم';
      default:
        return priority;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-8"
    >
      <motion.h2 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="text-2xl font-bold text-gray-800 text-center mb-8"
      >
        جزئیات مکاتبه
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field, index) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <label className="text-sm font-medium text-gray-500">
              {field.label}
            </label>
            <div className="mt-1 text-lg text-gray-900">
              {field.value || "---"}
            </div>
          </motion.div>
        ))}

        {/* وضعیت و اولویت */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 p-4 rounded-lg"
        >
          <label className="text-sm font-medium text-gray-500">وضعیت</label>
          <div className="mt-1">
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(data.status)}`}>
              {getStatusText(data.status)}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 p-4 rounded-lg"
        >
          <label className="text-sm font-medium text-gray-500">اولویت</label>
          <div className="mt-1">
            <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(data.priority)}`}>
              {getPriorityText(data.priority)}
            </span>
          </div>
        </motion.div>
      </div>

      {/* متن مکاتبه */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 p-6 rounded-lg mt-8"
      >
        <label className="text-sm font-medium text-gray-500">متن مکاتبه</label>
        <div className="mt-2 text-gray-700 whitespace-pre-wrap">
          {data.content}
        </div>
      </motion.div>

      {/* پیوست‌ها */}
      {data.attachments && data.attachments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold mb-4">پیوست‌ها</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.attachments.map((attachment, index) => (
              <motion.a
                key={index}
                href={attachment}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-8 h-8 mx-auto text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  پیوست {index + 1}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SeeCorrespondence; 