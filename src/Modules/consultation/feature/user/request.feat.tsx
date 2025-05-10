import { motion } from "framer-motion";
import { useConsultUser } from "../../hooks";
import { Spinner } from "@/components";

interface ConsultationRequestPropsType {
  subjectId: string;
  onCancel: () => void;
  onSuccess: (message: string) => void;
}

const ConsultationRequest: React.FC<ConsultationRequestPropsType> = ({
  subjectId,
  onCancel,
  onSuccess,
}) => {
  const { mutate: postSubject, isPending } = useConsultUser.usePostSubject();

  const handleRequest = () => {
    postSubject(
      { consultant_id: parseInt(subjectId) },
      {
        onSuccess: () => {
          onSuccess("درخواست مشاوره شما با موفقیت ثبت شد");
        },
      }
    );
  };

  console.log(subjectId);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col bg-gray-100 rounded-xl shadow-sm items-center justify-center min-h-[300px] p-6">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">
        آیا از درخواست مشاوره تخصصی اطمینان دارید؟
      </h2>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleRequest()}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          ارسال
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          انصراف
        </motion.button>
      </div>
    </div>
  );
};

export default ConsultationRequest;
