import { FC } from "react";
import { useUnusedProcess } from "../../hooks";
import { motion } from "framer-motion";

const FinancialStatementView: FC = () => {
  const { data } = useUnusedProcess.useGetList();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  interface ProcessTypes {
    financial_statement: {
      id: number;
      title: string;
      created_at: string;
      file: string;
      link: string;
    }[];
  }

  return (
    <div className="p-2 sm:p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg shadow-lg"
      >
        <div className="hidden sm:block">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-[#5677BC]">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white w-2/5">
                  عنوان
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white w-1/5">
                  فایل
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white w-1/5">
                  لینک
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={container}
              initial="hidden"
              animate="show"
              className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700"
            >
              {data?.map((process: ProcessTypes) =>
                [...process.financial_statement].reverse().map((statement) => (
                  <motion.tr
                    key={statement.id}
                    variants={item}
                    whileHover={{
                      scale: 1.01,
                      backgroundColor: "rgba(59, 130, 246, 0.05)",
                    }}
                    className="transition-colors duration-200"
                  >
                    <td className="px-3 sm:px-6 py-2 sm:py-4 w-2/5">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                        {statement.title}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={statement.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm hover:bg-blue-200 transition-colors duration-200"
                      >
                        مشاهده فایل
                      </motion.a>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={statement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm hover:bg-green-200 transition-colors duration-200"
                      >
                        مشاهده لینک
                      </motion.a>
                    </td>
                  </motion.tr>
                ))
              )}
            </motion.tbody>
          </table>
        </div>

        <div className="block sm:hidden">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {data?.map((process: ProcessTypes) =>
              [...process.financial_statement].reverse().map((statement) => (
                <motion.div
                  key={statement.id}
                  variants={item}
                  className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow"
                >
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {statement.title}
                    </h3>
                  </div>
                  <div className="flex space-x-2 space-x-reverse justify-end">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={statement.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs hover:bg-blue-200 transition-colors duration-200"
                    >
                      مشاهده فایل
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={statement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs hover:bg-green-200 transition-colors duration-200"
                    >
                      مشاهده لینک
                    </motion.a>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FinancialStatementView;
