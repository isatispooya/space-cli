import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import LoaderLg from './loader-lg';

const containerAnimation = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, ease: "easeInOut" },
};

const contentAnimation = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5, delay: 0.2 },
};

const PaymentResult = () => {
  //   const location = useLocation();
  const navigate = useNavigate();

  //   const { invoiceId } = Object.fromEntries(new URLSearchParams(location.search));

  const handleReturnToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  //   if (isLoading) {
  //     return <LoaderLg />;
  //   }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-200">
      <motion.div
        className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 text-center"
        {...containerAnimation}
      >
        <motion.div {...contentAnimation}>
          <>
            <h1 className="text-3xl font-extrabold text-green-600 mb-4">
              پرداخت موفق بود!
            </h1>
            <p className="text-gray-600 mb-6">
              پرداخت شما با موفقیت انجام شد. از شما متشکریم!
            </p>
          </>

          {/* <>
              <h1 className="text-3xl font-extrabold text-red-600 mb-4">پرداخت ناموفق</h1>
              <p className="text-gray-600 mb-6">پرداخت شما ناموفق بود. لطفاً مجدداً تلاش کنید.</p>
            </> */}
        </motion.div>

        <motion.button
          type="button"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 shadow-lg"
          onClick={handleReturnToHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          بازگشت به صفحه اصلی
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentResult;
