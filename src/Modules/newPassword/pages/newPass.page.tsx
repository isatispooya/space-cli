import InputLine from "../../../components/lineInput";
import { fadeIn } from "../../login/animations/fadeIn";
import { motion } from "framer-motion";
import { LoginHead } from "../../login/components";

const NewPass: React.FC = () => {
  return (
    <section
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-neutral-200 dark:bg-neutral-700"
    >
      <motion.div
        {...fadeIn(0.05, 0, 0.4)}
        className="container mx-auto p-4 md:p-8 max-w-md"
      >
        <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 ">
          <div className="w-full ">
            <div className="rounded-lg bg-white shadow-lg dark:bg-neutral-800 ">
              <div className="lg:flex lg:flex-wrap ">
                <div className="px-4 md:px-5 lg:w-full p-8 ">
                  <motion.div
                    {...fadeIn(0.05, 10)}
                    className="mx-auto p-4 md:p-8  border-2 border-gray-300 rounded-xl"
                  >
                    <LoginHead />
                    <InputLine label="رمز عبور جدید" />
                    <InputLine label="تکرار رمز جدید" />
                  </motion.div>

                  <button
                    className="inline-block w-full mt-5 rounded px-4 py-2 bg-gradient-to-r from-[#295270] to-[#524175] text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
                    type="submit"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    ثبت رمز جدید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NewPass;
