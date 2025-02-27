import { motion, AnimatePresence } from "framer-motion";
import { useCrowdPoints } from "../../hooks";
import { useState } from "react";
import { PlanByTraceCodeType, PlansType } from "../../types";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import { ErrorIcon, toast } from "react-hot-toast";
import { ErrorResponse } from "../../../../types";
import { AxiosError } from "axios";
import { LoaderLg, NoContent } from "../../../../components";
import { FormInput } from "../../../../components";
import { formatNumber } from "../../../../utils";
import { Toast } from "../../../../components";

const PlansView: React.FC<{
  plan: PlansType;
  onBack: () => void;
}> = ({ plan, onBack }) => {
  const { mutate: postCrowdPoints } = useCrowdPoints.usePostCrowdPoints(
    plan?.plan?.trace_code
  );
  const { data, isPending, refetch } = useCrowdPoints.useGetPlanByTraceCode(
    plan?.plan?.trace_code
  );
  const [coinValues, setCoinValues] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(10);
  const [submittingUserId, setSubmittingUserId] = useState<string | null>(null);

  if (isPending) {
    return <LoaderLg />;
  }

  const filteredUsers = Array.isArray(data)
    ? data.filter(
        (item: PlanByTraceCodeType) =>
          item.fulname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.refrence?.first_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.user?.uniqueIdentifier
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.refrence?.last_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : [];

  const handleCoinChange = (userId: string, value: string) => {
    setCoinValues((prev) => ({
      ...prev,
      [userId]: value === "" ? "" : value,
    }));
  };

  const handleConfirm = (item: PlanByTraceCodeType) => {
    setSubmittingUserId(String(item.user?.id || "0"));
    const defaultValue = Math.floor(item?.value / 1000) || 0;
    const payload = {
      user: String(item.user?.id || "N/A"),
      point_1: coinValues[item.user?.id || "0"]
        ? parseInt(coinValues[item.user?.id || "0"], 10)
        : defaultValue,
      refrence: String(item?.refrence?.id || "N/A"),
    };

    postCrowdPoints(payload, {
      onSuccess: async () => {
        toast.success("با موفقیت ثبت شد");
        await refetch();
        setSubmittingUserId(null);
      },
      onError: (error: AxiosError<unknown>) => {
        const errorMessage = (error.response?.data as ErrorResponse)?.error;
        Toast(errorMessage || "خطایی رخ داده است", <ErrorIcon />, "bg-red-500");
        setSubmittingUserId(null);
      },
    });
  };

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 5);
  };

  const handleDownloadExcel = () => {
    const excelData = filteredUsers.map((item) => ({
      name: item?.fulname,
      user: item?.user?.uniqueIdentifier,
      refrence: item?.refrence?.first_name + " " + item?.refrence?.last_name,
      value: item?.value,
      coin: item?.value / 1000,
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
                  {item?.fulname || "نامشخص"}
                </p>
                <p className="text-md text-gray-700 mb-2">
                  شناسه کاربری: {item?.user?.uniqueIdentifier || "نامشخص"}
                </p>
                <p className="text-md text-gray-700">
                  نام معرف:{" "}
                  {item?.refrence?.first_name +
                    " " +
                    item?.refrence?.last_name || "نامشخص"}
                </p>
                <p className="text-md text-gray-700 mb-8">
                  مبلغ سرمایه گذاری: {formatNumber(item?.value) || "نامشخص"}
                </p>
                <p className="text-md text-gray-700 mb-[-8px]">
                  سکه پرداخت شده : {item?.set_point || 0}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <FormInput
                    label="تعداد سکه"
                    id={`coin-${item.user?.id}`}
                    type="text"
                    value={
                      coinValues[item.user?.id] !== undefined
                        ? coinValues[item.user?.id]
                        : item?.value / 1000 || 0
                    }
                    onChange={(e) =>
                      handleCoinChange(item.user?.id || "0", e.target.value)
                    }
                    className="w-32"
                  />
                  <motion.button
                    onClick={() => handleConfirm(item)}
                    disabled={submittingUserId === item.user?.id}
                    className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {submittingUserId === item.user?.id
                      ? "در حال ثبت..."
                      : "ثبت"}
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
