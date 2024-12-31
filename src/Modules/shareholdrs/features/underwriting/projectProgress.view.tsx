import { FC } from "react";
import { motion } from "framer-motion";
import { useUnusedProcess } from "../../hooks";
import toast from "react-hot-toast";

const ProjectProgressView: FC = () => {
  const { data } = useUnusedProcess.useGetList();

  interface IProgressPlan {
    progress_plan_description: string;
    progress_plan_regulator: string;
    progress_plan_regulator_logo: string;
    progress_plan: string;
  }

  if ( data?.progress_plan === null) {
    toast.error("در حال حاضر پیشرفت پروژه وجود ندارد");
    return null;
  }

  const handleDownload = () => {
    toast.success("در حال دانلود پیشرفت پروژه");
  };

  return (
    <div>
      {data?.map((item: IProgressPlan, index: number) => (
        <div key={index}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto p-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl p-8 border border-gray-200 min-h-[800px]"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, #f9fafb 2px, transparent 2px)",
                backgroundSize: "100% 2rem",
                boxShadow: "0 0 20px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.05)",
              }}
            >
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-right text-3xl font-bold text-[#5677BC] mb-6"
                style={{ fontFamily: "Vazirmatn, sans-serif" }}
              >
                پیشرفت پروژه
              </motion.h1>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 mb-8 text-right"
                style={{ fontFamily: "Vazirmatn, sans-serif" }}
              >
                {item?.progress_plan_description}
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between mb-6 mt-6"
              >
                <div className="h-24 relative mr-10">
                  <img
                    src={item?.progress_plan_regulator_logo}
                    alt="لوگوی شرکت"
                    className="w-[180px]"
                  />
                </div>
                <p
                  className="text-right text-gray-600 max-w-md ml-20"
                  style={{ fontFamily: "Vazirmatn, sans-serif" }}
                >
                  {item?.progress_plan_regulator}
                </p>
              </motion.div>
              <a href={item?.progress_plan} onClick={handleDownload}>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mx-auto block bg-[#008282] text-white px-8 py-3 rounded-lg 
                       shadow-lg hover:bg-[#008282] transition-colors duration-200"
                  style={{ fontFamily: "Vazirmatn, sans-serif" }}
                >
                  دانلود طرح کسب و کار
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default ProjectProgressView;
