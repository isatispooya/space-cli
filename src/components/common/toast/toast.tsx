import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface ToastComponentPropsType {
  message: string;
  icon: JSX.Element;
  id: string;
  lineColor: string;
}

const ToastComponent = ({
  message,
  icon,
  id,
  lineColor,
}: ToastComponentPropsType) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.dismiss(id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <motion.div
      className="flex flex-col items-start w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg"
      role="alert"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <div className="inline-flex items-center justify-center w-8 h-8 text-white bg-gray-200 rounded-lg">
          {icon}
          <span className="sr-only">Notification icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">{message}</div>
      </div>
      <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${lineColor}`}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4 }}
        />
      </div>
    </motion.div>
  );
};

const Toast = (message: string, icon: JSX.Element, lineColor: string) => {
  toast.custom((t) => (
    <ToastComponent
      message={message}
      icon={icon}
      id={t.id}
      lineColor={lineColor}
    />
  ));
};

export default Toast;
