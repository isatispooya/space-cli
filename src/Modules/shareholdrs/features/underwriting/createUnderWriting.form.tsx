import * as Yup from "yup";
import { underwritingCreateTypes } from "../../types/underwritingCreate.type";
import { underwritingTypes } from "../../types/underwriting.type";
import { useUnderwriting, useUnusedProcess } from "../../hooks";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AgreementPopup } from "../../components";
import { formatNumber } from "../../../../utils";
import Sep from "../../../../../public/assets/sep.png";
import { ErrorIcon, toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { FaCheckCircle } from "react-icons/fa";

interface ErrorResponse {
  error: string;
}



interface SelectOption {
  label: string;
  value: string;
}

interface UserAccount {
  is_default: boolean;
  sheba_number: string;
}

const CreateUnderWritingForm = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { mutate: postPrecendence } = useUnderwriting.useCreate();
  const { data: unusedPrecedenceProcess } = useUnusedProcess.useGetList();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const typeOptions = [
    { label: "فیش", value: "1" },
    { label: "درگاه", value: "2" },
  ];

  console.log(unusedPrecedenceProcess);

  useEffect(() => {
    setShowPopup(true);
    if (unusedPrecedenceProcess && unusedPrecedenceProcess.length > 0) {
      const firstCompany = unusedPrecedenceProcess[0];
      formik.setFieldValue("company", firstCompany.id.toString());
      formik.setFieldValue("price", firstCompany.price || "");
      setSelectedDescription(firstCompany.description || "");

      if (formik.values.amount) {
        const totalPrice =
          (firstCompany.price || 0) * Number(formik.values.amount);
        formik.setFieldValue("total_price", totalPrice.toString());
      }
    }
  }, [unusedPrecedenceProcess]);

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
      type: "2",
      document: null,
    },
    validationSchema: Yup.object({
      amount: Yup.string().required("مقدار الزامی است"),
      company: Yup.string().required("شرکت الزامی است"),
      type: Yup.string().required("نوع الزامی است"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (values.type === "1") {
          const formData = new FormData();
          formData.append("amount", values.amount);
          formData.append("type", values.type);
          formData.append("process", values.company);
          if (values.document) {
            formData.append("document", values.document);
          }

          await postPrecendence(
            formData as unknown as underwritingCreateTypes,
            {
              onSuccess: (response) => {
                if (response.redirect_url) {
                  window.open(response.redirect_url, "_blank");
                }
                toast.success("عملیات با موفقیت انجام شد");
              },
              onError: (error) => {
                toast.error(`خطا در انجام عملیات: ${error.message}`);
              },
            }
          );
        } else {
          const purchaseData: underwritingCreateTypes = {
            amount: Number(values.amount),
            type: String(values.type),
            process: String(values.company),
          };

          await postPrecendence(purchaseData, {
            onSuccess: (response) => {
              if (response.redirect_url) {
                window.open(response.redirect_url, "_blank");
              }
              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                       <FaCheckCircle className="h-10 w-10 rounded-full bg-green-500 text-white" />
                      </div>
                      <p>عملیات با موفقیت انجام شد</p>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-200">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ));
            },
            onError: (error: AxiosError<unknown>) => {
              const errorMessage = (error.response?.data as ErrorResponse)
                ?.error;
              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <ErrorIcon className="h-10 w-10 rounded-full" />
                      </div>
                      <p>{errorMessage || "خطایی رخ داده است"}</p>
                    </div>
                  </div>
                </div>
              ));
            },
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("خطا در انجام عملیات");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompanyId = e.target.value;
    const selectedCompany = unusedPrecedenceProcess?.find(
      (process: underwritingTypes) => process.id === Number(selectedCompanyId)
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
  const isChequeType = formik.values.type === "1";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        const userData = await response.json();

        if (isChequeType && userData.accounts.length > 0) {
          const defaultAccount = userData.accounts.find(
            (account: UserAccount) => account.is_default
          );
          if (defaultAccount) {
            formik.setFieldValue("iban", defaultAccount.sheba_number);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isChequeType, formik]);

  return (
    <>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-[24px] shadow-lg">
        <h2 className="text-[#29D2C7] text-xl font-bold mb-6">
          ثبت پذیره نویسی
        </h2>
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
                <div className="text-red-500 text-xs">
                  {formik.errors.amount}
                </div>
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
                isDescriptionOpen ? "max-h-full" : "max-h-0"
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
              <div className="relative">
                <input
                  id="price"
                  name="price"
                  type="text"
                  disabled
                  value={formatNumber(Number(formik.values.price))}
                  className="w-full p-2 pl-12 text-sm border border-gray-300 rounded-md bg-gray-50"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ریال
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="total_price"
                className="block text-xs font-medium text-gray-700"
              >
                قیمت کل
              </label>
              <div className="relative">
                <input
                  id="total_price"
                  name="total_price"
                  type="text"
                  disabled
                  value={formatNumber(Number(formik.values.total_price))}
                  className="w-full p-2 pl-12 text-sm border border-gray-300 rounded-md bg-gray-50"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ریال
                </span>
              </div>
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
                className="w-full p-4  text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#29D2C7] focus:border-transparent"
              >
                <option className="p-6" value="">
                  انتخاب کنید
                </option>
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
            {isGatewayType && (
              <p className="text-red-500 text-xs">
                . قبل از اتصال به درگاه بانکی از قطع بودن فیلترشکن خود مطمئن
                شوید
              </p>
            )}
            {isGatewayType && (
              <div className="flex justify-start items-center my-4">
                <img
                  src={Sep}
                  alt="SEP Bank Logo"
                  className="h-16 object-contain"
                />
              </div>
            )}
            {isChequeType && (
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-md">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800">
                      شماره شبا:
                    </p>
                    <p className="text-sm font-medium text-gray-900 bg-white px-4 py-2 rounded-md shadow-inner">
                      {unusedPrecedenceProcess?.[0]?.sheba_number}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          unusedPrecedenceProcess?.[0]?.sheba_number || ""
                        );
                        toast.success("شماره شبا با موفقیت کپی شد");
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className={`px-4 py-2 ${
                        isCopied ? "bg-green-500" : "bg-[#29D2C7]"
                      } text-white rounded-md shadow hover:bg-[#25b2a8] transition-colors text-xs flex items-center`}
                    >
                      {isCopied ? "کپی شد!" : "کپی شماره شبا"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                    <p className="text-sm font-medium text-gray-800">
                      نام بانک:
                    </p>
                    <p className="text-sm text-gray-900">
                      بانک صادرات شعبه صنعتی یزد
                    </p>
                  </div>
                </div>
              </div>
            )}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full py-3 px-4 mt-20 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#29D2C7] focus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50"
            >
              {formik.isSubmitting ? "در حال ارسال..." : "ثبت  پذیره نویسی"}
            </button>
          </div>
        </form>
      </div>

      {showPopup && (
        <AgreementPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          terms={
            unusedPrecedenceProcess?.map(
              (process: underwritingTypes) => process.agreement_text
            ) || []
          }
          onAccept={() => {
            setShowPopup(false);
          }}
        />
      )}
    </>
  );
};

export default CreateUnderWritingForm;
