import * as Yup from "yup";
import { underwritingCreateTypes, underwritingTypes } from "../types";
import { useUnderwriting } from "../hooks";
import { useFormik } from "formik";
import { useState } from "react";

interface SelectOption {
  label: string;
  value: string;
}

const UnderWritingForm = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { mutate: postPrecendence } = useUnderwriting.useCreate();
  const { data: unusedPrecedenceProcess } = useUnderwriting.useGet();
  const [selectedDescription, setSelectedDescription] = useState("");

  const typeOptions = [
    { label: "فیش", value: "1" },
    { label: "درگاه", value: "2" },
  ];

  const companyOptions =
    unusedPrecedenceProcess?.map((process: underwritingTypes) => ({
      label: process.company,
      value: process.id,
    })) || [];

  const formik = useFormik({
    initialValues: {
      amount: "",
      company: "",
      price: "",
      total_price: "",
      transaction_id: "",
      type: "",
      document: null,
      agreement: false,
    },
    validationSchema: Yup.object({
      amount: Yup.string().required("مقدار الزامی است"),
      company: Yup.string().required("شرکت الزامی است"),
      type: Yup.string().required("نوع الزامی است"),
      agreement: Yup.boolean()
        .oneOf([true], "پذیرش قوانین و مقررات الزامی است")
        .required("پذیرش قوانین و مقررات الزامی است"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const purchaseData: underwritingCreateTypes = {
          amount: Number(values.amount),
          type: String(values.type),
          process: String(values.company),
        };

        await postPrecendence(purchaseData<underwritingCreateTypes>, {
          onSuccess: (response) => {
            console.log("Purchase precedence created successfully");

            if (response.redirect_url) {
              window.open(response.redirect_url, "_blank");
            }
          },
          onError: (error) => {
            console.error("Error creating purchase precedence:", error);
          },
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompanyId = e.target.value;
    const selectedCompany = unusedPrecedenceProcess?.find(
      (process: underwritingTypes) =>
        process.id === Number(selectedCompanyId)
    );
    formik.setFieldValue("company", selectedCompanyId);
    formik.setFieldValue("price", selectedCompany?.price || "");
    setSelectedDescription(selectedCompany?.description || "");

    if (formik.values.amount) {
      const totalPrice =
        (selectedCompany?.price || 0) * Number(formik.values.amount);
      formik.setFieldValue("total_price", totalPrice.toString());
    }
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    formik.setFieldValue("amount", newAmount);
    if (formik.values.company) {
      const selectedCompany = unusedPrecedenceProcess?.find(
        (process: underwritingTypes) =>
          process.id === Number(formik.values.company)
      );
      const totalPrice = (selectedCompany?.price || 0) * Number(newAmount);
      formik.setFieldValue("total_price", totalPrice.toString());
    }
  };

  const isGatewayType = formik.values.type === "2";

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-[24px] shadow-lg">
      <h2 className="text-[#29D2C7] text-xl font-bold mb-6">ثبت حق تقدم</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="amount"
              className="block text-xs font-medium text-gray-700"
            >
              مقدار
            </label>
            <input
              id="amount"
              name="amount"
              type="text"
              onChange={handleAmountChange}
              value={formik.values.amount}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#29D2C7] focus:border-transparent"
            />
            {formik.errors.amount && formik.touched.amount && (
              <div className="text-red-500 text-xs">{formik.errors.amount}</div>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="company"
              className="block text-xs font-medium text-gray-700"
            >
              شرکت
            </label>
            <select
              id="company"
              name="company"
              onChange={handleCompanyChange}
              value={formik.values.company}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#29D2C7] focus:border-transparent"
            >
              <option value="">انتخاب کنید</option>
              {companyOptions.map((option: SelectOption) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formik.errors.company && formik.touched.company && (
              <div className="text-red-500 text-xs">
                {formik.errors.company}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            className="w-full flex justify-between items-center p-4 hover:bg-slate-50 transition-colors"
          >
            <span className="font-medium text-slate-900">توضیحات</span>
            <span
              className={`text-slate-500 transition-transform duration-300 ${
                isDescriptionOpen ? "rotate-45" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isDescriptionOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="border-t border-slate-200">
              {formik.values.company ? (
                <p className="p-4 text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                  {selectedDescription}
                </p>
              ) : (
                <p className="p-4 text-sm text-slate-400 italic">
                  لطفا یک شرکت را انتخاب کنید
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="price"
              className="block text-xs font-medium text-gray-700"
            >
              قیمت واحد
            </label>
            <input
              id="price"
              name="price"
              type="text"
              disabled
              value={formik.values.price}
              className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="total_price"
              className="block text-xs font-medium text-gray-700"
            >
              قیمت کل
            </label>
            <input
              id="total_price"
              name="total_price"
              type="text"
              disabled
              value={formik.values.total_price}
              className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="type"
              className="block text-xs font-medium text-gray-700"
            >
              نوع
            </label>
            <select
              id="type"
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#29D2C7] focus:border-transparent"
            >
              <option value="">انتخاب کنید</option>
              {typeOptions.map((option: SelectOption) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formik.errors.type && formik.touched.type && (
              <div className="text-red-500 text-xs">{formik.errors.type}</div>
            )}
          </div>

          {!isGatewayType && (
            <div className="space-y-1">
              <label
                htmlFor="transaction_id"
                className="block text-xs font-medium text-gray-700"
              >
                شناسه تراکنش
              </label>
              <input
                id="transaction_id"
                name="transaction_id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.transaction_id}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#29D2C7] focus:border-transparent"
              />
            </div>
          )}
        </div>

        {!isGatewayType && (
          <div className="space-y-1">
            <label
              htmlFor="document"
              className="block text-xs font-medium text-gray-700"
            >
              سند
            </label>
            <input
              id="document"
              name="document"
              type="file"
              onChange={(e) => {
                if (e.currentTarget.files?.[0]) {
                  formik.setFieldValue("document", e.currentTarget.files[0]);
                }
              }}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#29D2C7] focus:border-transparent"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              onChange={formik.handleChange}
              checked={formik.values.agreement}
              className="mt-1"
            />
            <label htmlFor="agreement" className="text-xs text-slate-600">
              <span>اینجانب </span>
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#29D2C7] hover:text-[#008282] underline"
              >
                قوانین و مقررات
              </a>
              <span> را مطالعه کرده و می‌پذیرم</span>
            </label>
          </div>
          <p className="text-red-500 text-xs">
            قبل از اتصال به درگاه بانکی از قطع بودن فیلترشکن اطلاع فرمایید
          </p>
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.values.agreement}
            className="w-full py-3 px-4 mt-20 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#29D2C7] focus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50"
          >
            {formik.isSubmitting ? "در حال ارسال..." : "ثبت حق تقدم"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UnderWritingForm;
