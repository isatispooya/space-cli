import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../animations/fadeIn";
import useCaptcha from "../hooks/UseCaptcha";

interface CaptchaImgProps {
  setEncryptedResponse: (response: string | null) => void;
}

const CaptchaImg: React.FC<CaptchaImgProps> = ({ setEncryptedResponse }) => {
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
    setEncryptedResponse(null); // Clear previous response
    refetch(); // Trigger a new captcha fetch
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
              onClick={handleRefetch} // Handle refresh on image click
              className="w-full max-w-[280px] h-16 rounded shadow-md border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <p>کپچا موجود نیست</p>
      )}
    </motion.div>
  );
};

export default CaptchaImg;
