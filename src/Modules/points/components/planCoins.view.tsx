import { motion, AnimatePresence } from "framer-motion";
import { useCrowdPoints } from "../hooks";
import { useState } from "react";
import { PlanByTraceCodeType, PlansType } from "../types";
import { FaArrowRight } from "react-icons/fa"; // Changed to left arrow for back button
import { LoaderLg, NoContent } from "../../../components";
import { FormInput } from "../../../components/inputs";
import { formatNumber } from "../../../utils";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";

const PlansView: React.FC<{
  plan: PlansType;
  onBack: () => void;
}> = ({ plan, onBack }) => {
  const { mutate: postCrowdPoints } = useCrowdPoints.usePostCrowdPoints(
    plan?.plan?.trace_code
  );
  const { data, isPending } = useCrowdPoints.useGetPlanByTraceCode(
    plan?.plan?.trace_code
  );
  const [coinValues, setCoinValues] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(10);

  const filteredUsers = Array.isArray(data)
    ? data.filter(
        (item: PlanByTraceCodeType) =>
          item.data_crowd?.fulname
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.data_crowd?.refrence_number?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.data_crowd?.user
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.data_crowd?.refrence_number?.user_id
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : [];

  const handleCoinChange = (userId: string, value: string) => {
    setCoinValues((prev) => ({
      ...prev,
      [userId]: value,
    }));
  };

  const handleConfirm = (item: PlanByTraceCodeType) => {
    const payload = {
      selected_references: item.refrence_number?.user_id || "N/A",
      coin: parseInt(coinValues[item.user_info] || "0", 10),
      subset_uniqueidefinder: item?.user_info || "N/A",
    };

    postCrowdPoints(payload);
  };

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 5);
  };

  if (isPending) {
    return <LoaderLg />;
  }

  const handleDownloadExcel = () => {
    const excelData = filteredUsers.map((item) => ({
      name: item?.data_crowd?.fulname,
      user: item?.data_crowd?.user,
      refrence: item?.refrence_number?.name,
      value: item?.data_crowd?.value,
      coin: item?.data_crowd?.value / 1000,
    }));
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "users_data.xlsx");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.div
        className="mb-4 flex items-center space-x-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowRight className="text-lg" />
        </motion.button>
      </motion.div>

      <motion.div
        className="border border-gray-300 rounded-lg p-4 my-4 shadow-md bg-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold text-center text-gray-800">
          {plan?.plan?.persian_name}
        </h2>
      </motion.div>

      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <input
          placeholder="جستجوی کاربر..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
      </motion.div>

      <div className="flex flex-wrap justify-end gap-4">
        <Button
          onClick={() => handleDownloadExcel()}
          variant="contained"
          color="primary"
        >
          دانلود اکسل
        </Button>
      </div>

      <AnimatePresence>
        {filteredUsers?.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {filteredUsers.slice(0, visibleItems).map((item, index) => (
              <motion.div
                key={index}
                className="mt-4 border w-[500px] border-gray-300 rounded-lg p-4 shadow-md bg-white relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg font-bold text-gray-700 mb-8">
                  {item?.data_crowd?.fulname || "نامشخص"}
                </p>
                <p className="text-md text-gray-700 mb-2">
                  شناسه کاربری: {item?.data_crowd?.user || "نامشخص"}
                </p>
                <p className="text-md text-gray-700">
                  نام معرف: {item?.refrence_number?.name || "نامشخص"}
                </p>
                <p className="text-md text-gray-700">
                  مبلغ سرمایه گذاری:{" "}
                  {formatNumber(item?.data_crowd?.value) || "نامشخص"}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <FormInput
                    label="تعداد سکه"
                    id={`coin-${item.user_info}`}
                    type="text"
                    value={
                      coinValues[item.user_info] ||
                      item?.data_crowd?.value / 1000 ||
                      0
                    }
                    onChange={(e) =>
                      handleCoinChange(item.user_info, e.target.value)
                    }
                    className="w-32"
                  />
                  <motion.button
                    onClick={() => handleConfirm(item)}
                    className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ارسال
                  </motion.button>
                </div>
              </motion.div>
            ))}

            {filteredUsers.length > visibleItems && (
              <motion.button
                onClick={handleShowMore}
                className="w-full mt-6 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                مشاهده بیشتر
              </motion.button>
            )}
          </div>
        ) : (
          <NoContent label="کاربری یافت نشد." />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlansView;
