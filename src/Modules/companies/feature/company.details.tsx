import { motion } from "framer-motion";
import { CompanyData } from "../types/company.type";

interface SeeCompanyProps {
  data: CompanyData;
}

const SeeCompany = ({ data }: SeeCompanyProps) => {
  const fields = [
    { label: "نام شرکت", value: data.name },
    { label: "نوع شرکت", value: data.company_type },
    { label: "سال تاسیس", value: data.year_of_establishment },
    { label: "تلفن", value: data.phone },
    { label: "کد پستی", value: data.postal_code },
    { label: "کد شناسه", value: data.national_id },
    { label: "توضیحات", value: data.description },
    { label: "سرمایه ثبتی", value: data.registered_capital?.toLocaleString() },
    { label: "شماره ثبت", value: data.registration_number },
    { label: "نوع فعالیت", value: data.type_of_activity },
    { label: "وبسایت", value: data.website },
    { label: "آدرس", value: data.address },
  ];
  const imageFields = [
    { label: "لوگو", value: data.logo },
    { label: "سربرگ", value: data.letterhead },
    { label: "مهر", value: data.seal },
    { label: "امضا", value: data.signature },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-8"
    >
      <motion.h2
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="text-2xl font-bold text-gray-800 text-center mb-8"
      >
        اطلاعات شرکت
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field, index) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <label className="text-sm font-medium text-gray-500">
              {field.label}
            </label>
            <div className="mt-1 text-lg text-gray-900">
              {field.value || "---"}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">تصاویر و اسناد</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imageFields.map((field, index) => (
            <motion.div
              key={field.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-gray-500">
                {field.label}
              </label>
              {field.value && typeof field.value === "string" ? (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={field.value}
                  alt={field.label}
                  className="w-full h-32 object-contain rounded-lg border border-gray-200"
                />
              ) : (
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  بدون تصویر
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SeeCompany;
