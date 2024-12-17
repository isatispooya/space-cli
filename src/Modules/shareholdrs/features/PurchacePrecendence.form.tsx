import * as Yup from "yup";
import usePostPurchacePrecendence from "../hooks/usePostPurchacePrecendence";
import { useUnusedPrecedenceProcess } from "../hooks";
import { unusedPrecedenceProcessTypes } from "../types";
import { useFormik } from "formik";
import { PurchacePrecendenceCreate } from "../types/PurchacePrecendence.type";
import { useState } from "react";

interface SelectOption {
  label: string;
  value: number;
}

const PurchacePrecendenceForm = () => { 
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { mutate: postPrecendence } = usePostPurchacePrecendence();
  const { data: unusedPrecedenceProcess } = useUnusedPrecedenceProcess();
  const [selectedDescription, setSelectedDescription] = useState("");

  const typeOptions = [
    { label: "فیش", value: 1 },
    { label: "درگاه", value: 2 },
  ];

  const companyOptions =
    unusedPrecedenceProcess?.map((process: unusedPrecedenceProcessTypes) => ({
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
        const purchaseData: PurchacePrecendenceCreate = {
          amount: Number(values.amount),
          price: Number(values.price),
          total_price: Number(values.total_price),
          type: Number(values.type),
          process: Number(values.company),
          transaction_id: values.transaction_id,
          document: values.document,
        };

        await postPrecendence(purchaseData, {
          onSuccess: () => {
            console.log("Purchase precedence created successfully");
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
    const selectedCompanyId = Number(e.target.value);
    const selectedCompany = unusedPrecedenceProcess?.find(
      (process: unusedPrecedenceProcessTypes) =>
        process.id === selectedCompanyId
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
        (process: unusedPrecedenceProcessTypes) =>
          process.id === Number(formik.values.company)
      );
      const totalPrice = (selectedCompany?.price || 0) * Number(newAmount);
      formik.setFieldValue("total_price", totalPrice.toString());
    }
  };

  const isGatewayType = formik.values.type === "2";

  return (
    <div className="p-6">
      <h2 className="text-[#29D2C7] text-xl mb-6">ثبت حق تقدم</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount">مقدار</label>
          <input
            id="amount"
            name="amount"
            type="text"
            onChange={handleAmountChange}
            value={formik.values.amount}
            className="w-full p-2 border rounded"
          />
          {formik.errors.amount && formik.touched.amount && (
            <div className="text-red-500 text-sm">{formik.errors.amount}</div>
          )}
        </div>
        <div>
          <label htmlFor="company">شرکت</label>
          <select
            id="company"
            name="company"
            onChange={handleCompanyChange}
            value={formik.values.company}
            className="w-full p-2 border rounded"
          >
            <option value="">انتخاب کنید</option>
            {companyOptions.map((option: SelectOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.errors.company && formik.touched.company && (
            <div className="text-red-500 text-sm">{formik.errors.company}</div>
          )}
        </div>
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
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
        <div>
          <label htmlFor="price">قیمت واحد</label>
          <input
            id="price"
            name="price"
            type="text"
            disabled
            value={formik.values.price}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="total_price">قیمت کل</label>
          <input
            id="total_price"
            name="total_price"
            type="text"
            disabled
            value={formik.values.total_price}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="type">نوع</label>
          <select
            id="type"
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
            className="w-full p-2 border rounded"
          >
            <option value="">انتخاب کنید</option>
            {typeOptions.map((option: SelectOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.errors.type && formik.touched.type && (
            <div className="text-red-500 text-sm">{formik.errors.type}</div>
          )}
        </div>

        {!isGatewayType && (
          <>
            <div>
              <label htmlFor="transaction_id">شناسه تراکنش</label>
              <input
                id="transaction_id"
                name="transaction_id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.transaction_id}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="document">سند</label>
              <input
                id="document"
                name="document"
                type="file"
                onChange={(e) => {
                  if (e.currentTarget.files?.[0]) {
                    formik.setFieldValue("document", e.currentTarget.files[0]);
                  }
                }}
                className="w-full p-2 border rounded"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
          </>
        )}

        <div className="flex items-start gap-2 my-4">
          <input
            type="checkbox"
            id="agreement"
            name="agreement"
            onChange={formik.handleChange}
            checked={formik.values.agreement}
            className="mt-1"
          />
          <label htmlFor="agreement" className="text-sm text-slate-600">
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
        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.values.agreement}
          className="bg-[#29D2C7] hover:bg-[#008282] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? "در حال ارسال..." : "ثبت حق تقدم"}
        </button>
      </form>
    </div>
  );
};

export default PurchacePrecendenceForm;
