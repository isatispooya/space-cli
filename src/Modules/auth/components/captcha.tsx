import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../animations/fadeIn";
import useCaptcha from "../hooks/useCaptcha";

interface CaptchaType {
  setEncryptedResponse: (response: string | null) => void;
}

const Captcha: React.FC<CaptchaType> = ({ setEncryptedResponse }) => {
  const { data, refetch } = useCaptcha();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      refetch();
      initialized.current = true;
    }
  }, [refetch]);

  useEffect(() => {
    if (data?.captcha?.encrypted_response) {
      setEncryptedResponse(data.captcha.encrypted_response);
    }
  }, [data, setEncryptedResponse]);

  const handleRefetch = () => {
    setEncryptedResponse(null);
    refetch();
  };

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
              onClick={handleRefetch}
              className="w-full max-w-[280px] h-16 rounded bg-gray-100 dark:bg-gray-800  dark:border-gray-600 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <p>کپچا موجود نیست</p>
      )}
    </motion.div>
  );
};

export default Captcha;
