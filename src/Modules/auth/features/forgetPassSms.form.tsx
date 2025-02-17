import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputLogin from "../../../components/common/inputs/inputBase";
import toast from "react-hot-toast";
import useForgetPassSms from "../hooks/useForgetPassSms";
import { useLoginStore } from "../stores/loginStore";
import { ErrorResponse } from "../../../types";
import { AxiosError } from "axios";

const ForgetPassSmsForm: React.FC<{ onVerificationSuccess: () => void }> = ({
  onVerificationSuccess,
}) => {
  const { setNationalCode } = useLoginStore();
  const { mutate } = useForgetPassSms();

  const validationSchema = Yup.object({
    nationalCode: Yup.string()
      .required("کد ملی الزامی است")
      .matches(/^[0-9]{10}$/, "کد ملی باید 10 رقم باشد"),
  });

  const formik = useFormik({
    initialValues: {
      nationalCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setNationalCode(values.nationalCode);
      mutate(values.nationalCode, {
        onSuccess: (response: { message: string }) => {
          toast.success(response.message);
          onVerificationSuccess();
        },
        onError: (error: AxiosError<unknown>) => {
          const errorMessage = (error.response?.data as ErrorResponse)?.error;
          toast.error(errorMessage || "خطایی رخ داده است");
        },
      });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <InputLogin
          type="text"
          label="کد ملی"
          placeholder="کد ملی"
          name="nationalCode"
          value={formik.values.nationalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.nationalCode ? formik.errors.nationalCode : undefined
          }
        />
        {formik.touched.nationalCode && formik.errors.nationalCode && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.nationalCode}
          </div>
        )}
        <button
          className="inline-block w-full mt-5 rounded px-4 py-3 text-md font-medium uppercase bg-blue-950 leading-normal text-white shadow-md transition duration-150 ease-in-out"
          type="submit"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          ارسال کد بازیابی
        </button>
      </form>
    </>
  );
};

export default ForgetPassSmsForm;
