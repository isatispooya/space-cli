import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../animations/fadeIn";
import useCaptcha from "../hooks/UseCaptcha";
import { FiRefreshCw } from "react-icons/fi";

interface CaptchaImgProps {
  setEncryptedResponse: (response: string | null) => void;
}

const CaptchaImg: React.FC<CaptchaImgProps> = ({ setEncryptedResponse }) => {
  const { data, refetch } = useCaptcha();


  useEffect(() => {
    if (data?.captcha?.encrypted_response) {
      setEncryptedResponse(data.captcha.encrypted_response);
    }
  }, [data, setEncryptedResponse]);

  return (
    <motion.div
      {...fadeIn(1.4, 20)}
      className="relative mb-4 flex items-center justify-center mt-5"
    >
      {data?.captcha?.image ? (
        <div className="captcha-container flex flex-col items-center">
          <div className="flex items-center mb-2">
            <img
              src={`data:image/png;base64,${data.captcha.image}`}
              alt="CAPTCHA"
              className="w-full max-w-[280px] h-16 rounded shadow-md border border-gray-300 dark:border-gray-600"
            />
            <motion.button
              whileHover={{ scale: 1.1, rotate: 20 }}
              whileTap={{ scale: 0.9, rotate: -20 }}
              onClick={() => refetch()}
              className="mr-3 text-blue-500 dark:text-blue-300"
              title="Refresh CAPTCHA"
              type="button"
            >
              <FiRefreshCw size={24} />
            </motion.button>
          </div>
        </div>
      ) : (
        <p>کپچا موجود نیست</p>
      )}
    </motion.div>
  );
};

export default CaptchaImg;
