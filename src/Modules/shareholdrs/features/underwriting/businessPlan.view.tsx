import { FC } from "react";
import { motion } from "framer-motion";
import { useUnusedProcess } from "../../hooks";
import ViewDownload from "../../../../components/viewDownload";

const BusinessPlanView: FC = () => {
  const { data } = useUnusedProcess.useGetList();

  interface IBusinessPlan {
    business_plan_description: string;
    business_plan_regulator: string;
    business_plan_regulator_logo: string;
    business_plan: string;
  }
  return (
    <div>
      {data?.map((item: IBusinessPlan, index: number) => (
        // <div key={index}>
        //   <motion.div
        //     initial={{ opacity: 0 }}
        //     animate={{ opacity: 1 }}
        //     className="max-w-2xl mx-auto p-8"
        //   >
        //     <motion.div
        //       initial={{ y: 20, opacity: 0 }}
        //       animate={{ y: 0, opacity: 1 }}
        //       className="bg-white rounded-lg shadow-xl p-8 border border-gray-200 min-h-[800px]"
        //       style={{
        //         backgroundImage:
        //           "linear-gradient(0deg, #f9fafb 2px, transparent 2px)",
        //         backgroundSize: "100% 2rem",
        //         boxShadow: "0 0 20px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.05)",
        //       }}
        //     >
        //       <motion.h1
        //         initial={{ y: -20 }}
        //         animate={{ y: 0 }}
        //         className="text-right text-3xl font-bold text-[#5677BC] mb-6"
        //         style={{ fontFamily: "Vazirmatn, sans-serif" }}
        //       >
        //         طرح کسب و کار
        //       </motion.h1>
        //       <motion.div
        //         initial={{ y: 20, opacity: 0 }}
        //         animate={{ y: 0, opacity: 1 }}
        //         transition={{ delay: 0.2 }}
        //         className="space-y-4 mb-8 text-right"
        //         style={{ fontFamily: "Vazirmatn, sans-serif" }}
        //       >
        //         {item?.business_plan_description}
        //       </motion.div>
        //       <motion.div
        //         initial={{ y: 20, opacity: 0 }}
        //         animate={{ y: 0, opacity: 1 }}
        //         transition={{ delay: 0.4 }}
        //         className="flex items-center justify-between mb-6 mt-6"
        //       >
        //         <div className="h-24 relative mr-10">
        //           <img
        //             src={item?.business_plan_regulator_logo}
        //             alt="لوگوی شرکت"
        //             className="w-[180px]"
        //           />
        //         </div>
        //         <p
        //           className="text-right text-gray-600 max-w-md ml-20"
        //           style={{ fontFamily: "Vazirmatn, sans-serif" }}
        //         >
        //           {item?.business_plan_regulator}
        //         </p>
        //       </motion.div>
        //       <a href={item?.business_plan}>
        //         <motion.button
        //           initial={{ y: 20, opacity: 0 }}
        //           animate={{ y: 0, opacity: 1 }}
        //           transition={{ delay: 0.6 }}
        //           whileHover={{ scale: 1.05 }}
        //           whileTap={{ scale: 0.95 }}
        //           className="mx-auto block bg-[#008282] text-white px-8 py-3 rounded-lg 
        //                    shadow-lg hover:bg-[#008282] transition-colors duration-200"
        //           style={{ fontFamily: "Vazirmatn, sans-serif" }}
        //         >
        //           دانلود طرح کسب و کار
        //         </motion.button>
        //       </a>
        //     </motion.div>
        //   </motion.div>
        // </div>
        <ViewDownload
          title="طرح کسب و کار"
          description={item?.business_plan_description}
          regulatorLogo={item?.business_plan_regulator_logo}
          regulatorText={item?.business_plan_regulator}
          downloadLink={item?.business_plan}
        />
      ))}
    </div>
  );
};

export default BusinessPlanView;
