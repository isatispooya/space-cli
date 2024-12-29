import { useFormik } from "formik";

import * as Yup from "yup";

import toast from "react-hot-toast";
import { useUnderwritingStore } from "../store";
import { useUnderwriting } from "../hooks";
import { underwritingCreateTypes, underwritingTypes } from "../types";

const EditUnderWritingForm = () => {
  const { data: purchaseData } = useUnderwriting.useGet();
  const { id } = useUnderwritingStore();

  const { data: processData } = useUnderwriting.useGet();

  const data = purchaseData?.find((item: underwritingTypes) => item.id === id);

  const { mutate: patchUnusedPrecedenceProcess } = useUnderwriting.useUpdate();

  const formik = useFormik({
    initialValues: {
      amount: data?.amount?.toString() || "",
      process: data?.process?.toString() || "",
      price: data?.price?.toString() || "",
      total_price: data ? (data.price * data.amount).toString() : "",
      transaction_id: data?.transaction_id || "",
      status: data?.status || "",
      document: data?.document || "",
      type: data?.type?.toString() || "",
    },
    validationSchema: Yup.object({
      amount: Yup.string().required("مقدار الزامی است"),
      process: Yup.string().required("شرکت الزامی است"),
      type: Yup.string().required("نوع الزامی است"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const purchaseData: underwritingCreateTypes = {
          amount: Number(values.amount),
          price: Number(values.price),
          total_price: Number(values.total_price),
          process: Number(values.process),
          transaction_id: values.transaction_id,
          status: values.status,
        };

        await patchUnusedPrecedenceProcess(purchaseData, {
          onSuccess: () => {
            console.log("Purchase precedence updated successfully");
          },
          onError: () => {
            toast.error("خطایی رخ داده است");
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
    const selectedCompany = processData?.find(
      (process: underwritingTypes) => process.id === selectedCompanyId
    );

    const updates = {
      process: selectedCompanyId,
      price: selectedCompany?.price || "",
      total_price: formik.values.amount
        ? (
            (selectedCompany?.price || 0) * Number(formik.values.amount)
          ).toString()
        : "",
    };

    formik.setValues({
      ...formik.values,
      ...updates,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;

    const selectedCompany = processData?.find(
      (process: underwritingTypes) =>
        process.id === Number(formik.values.process)
    );

    const updates = {
      amount: newAmount,
      total_price: formik.values.process
        ? ((selectedCompany?.price || 0) * Number(newAmount)).toString()
        : "",
    };

    formik.setValues({
      ...formik.values,
      ...updates,
    });
  };

  const isGatewayType = formik.values.type === "2";

  return (
    <>
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
              <div className="text-red-500 text-sm">
                {formik.errors.amount as string}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="company">فرایند</label>
            <select
              id="company"
              name="process"
              onChange={handleCompanyChange}
              value={formik.values.process}
              className="w-full p-2 border rounded"
            >
              <option value="">انتخاب کنید</option>
              {processData?.map((process: underwritingTypes) => (
                <option key={process.id} value={process.id}>
                  {process.company}
                </option>
              ))}
            </select>
            {formik.errors.process && formik.touched.process && (
              <div className="text-red-500 text-sm">
                {formik.errors.process as string}
              </div>
            )}
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
            <label htmlFor="status">وضعیت</label>
            <select
              id="status"
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
              className="w-full p-2 border rounded"
            >
              <option value="pending">در انتظار</option>
              <option value="approved">تایید شده</option>
              <option value="rejected">رد شده</option>
            </select>
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
            </>
          )}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-[#29D2C7] hover:bg-[#008282] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "در حال ارسال..." : "ویرایش حق تقدم"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUnderWritingForm;
