import { FC } from "react";
import { useUnusedProcess } from "../../hooks";
import { motion } from "framer-motion";

interface ICreditAnalysisType {
  validation_description: string;
  validation: string;
  validation_regulator_logo: string;
  validation_regulator: string;
}

const CreditAnalysisView: FC = () => {
  const { data } = useUnusedProcess.useGetList();

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <div className="py-8 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full mx-auto p-4 sm:p-8"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full bg-white rounded-lg p-8 sm:p-12 border-2 border-gray-200 relative"
          >
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#5677BC] rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#5677BC] rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#5677BC] rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#5677BC] rounded-br-lg" />

            {data?.map((item: ICreditAnalysisType, index: number) => (
              <div key={index}>
                <div className="flex flex-col">
                    <img
                      src={item?.validation}
                      alt="اعتبار سنجی"
                      style={{ width: "100%" }}
                    />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreditAnalysisView;
