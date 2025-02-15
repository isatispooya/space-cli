import { useParams } from "react-router-dom";
import { useUserPro } from "../hooks";
import { motion } from "framer-motion";
import { UsersTypes } from "../types";
import { NoContent } from "../../../components";
import { LoaderLg } from "../../../components";

const UserView = () => {
  const { id } = useParams();
  const { data, isPending } = useUserPro.useUser(Number(id));

  if (isPending) {
    return <LoaderLg />;
  }

  if (!data) {
    return <NoContent label="کاربر یافت نشد" />;
  }

  const {
    first_name,
    last_name,
    age,
    birth_date,
    email,
    gender,
    mobile,
    place_of_birth,
    uniqueIdentifier,
    address: { city },
    points: { point_1, point_2 },
    accounts,
  } = data;

  const renderField = (
    label: string,
    value: string | undefined,
    key: number
  ) => (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="col-span-1"
    >
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value || "ناموجود"}</p>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8  min-h-screen"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center text-gray-800 mb-8"
      >
        جزئیات کاربر
      </motion.h1>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "نام", value: first_name },
            { label: "نام خانوادگی", value: last_name },
            { label: "سن", value: age },
            { label: "تاریخ تولد", value: birth_date },
            { label: "ایمیل", value: email },
            { label: "جنسیت", value: gender === "M" ? "مرد" : "زن" },
            { label: "شماره موبایل", value: mobile },
            { label: "محل تولد", value: place_of_birth },
            { label: "شهر", value: city },
            { label: "کدملی", value: uniqueIdentifier },
          ].map(({ label, value }, index) => renderField(label, value, index))}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">امتیازات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "سکه", value: point_1 },
              { label: "بذر", value: point_2 },
            ].map(({ label, value }, index) =>
              renderField(label, value, index)
            )}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">حساب‌ها</h2>
          {accounts.map((account: UsersTypes) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-4 mb-4 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "شماره حساب", value: account.account_number },
                  { label: "بانک", value: account.bank },
                  { label: "کد شعبه", value: account.branch_code },
                  { label: "نام شعبه", value: account.branch_name },
                  { label: "شماره شبا", value: account.sheba_number },
                ].map(({ label, value }, idx) =>
                  renderField(label, value, idx)
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserView;
