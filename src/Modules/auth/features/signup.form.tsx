import React, { useState } from "react";
import InputLogin from "../../../components/common/inputs/inputBase";
import CaptchaImg from "../components/captcha.field";
import { useLoginStore } from "../stores/loginStore";
import { motion } from "framer-motion";
import useRegister from "../hooks/useRegister";
import useApplyNationalCode from "../hooks/useOtp";
import { fadeIn } from "../animations/fadeIn";
import toast, { ErrorIcon } from "react-hot-toast";
import Spinner from "../../../components/loaders/spinner";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCaptcha } from "../hooks";
import { Toast } from "../../../components/common";

const validationSchema = Yup.object({
  nationalCode: Yup.string()
    .required("کد ملی الزامی است")
    .matches(/^[0-9]+$/, "فقط اعداد مجاز هستند")
    .min(10, "شناسه ملی باید حداقل 10 رقم باشد")
    .max(14, "شناسه ملی باید حداکثر 14 رقم باشد"),
  captchaInput: Yup.string().when("showOtpInput", {
    is: false,
    then: () => Yup.string().required("کد امنیتی الزامی است"),
  }),
  otp: Yup.string().when("showOtpInput", {
    is: true,
    then: () => Yup.string().required("کد تایید الزامی است"),
  }),
});

const SignupForm = () => {
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
  const { mutate: signupMutate, isPending: signupPending } =
    useApplyNationalCode();
  const { mutate: register, isPending: registerPending } = useRegister();
  const { refetch } = useCaptcha();
  const { encryptedResponse, setEncryptedResponse } = useLoginStore();
  const urlParams = new URLSearchParams(window.location.search);
  const referral = urlParams.get("rf") || "";

  const formik = useFormik({
    initialValues: {
      nationalCode: "",
      captchaInput: "",
      otp: "",
      showOtpInput: false,
    },
    validationSchema,
    onSubmit: (values) => {
      if (!showOtpInput) {
        handleCaptchaSend(values);
      } else {
        handleRegister(values);
      }
    },
  });

  const handleRegister = (values: typeof formik.values) => {
    register(
      {
        nationalCode: values.nationalCode,
        otpValue: values.otp,
        encryptedResponse: encryptedResponse || "",
        referral,
      },
      {
        onSuccess: () => {
          formik.setFieldValue("otp", "");
          refetch();
        },
        onError: () => {
          formik.setFieldValue("otp", "");
          refetch();
        },
      }
    );
  };

  const handleCaptchaSend = (values: typeof formik.values) => {
    signupMutate(
      {
        nationalCode: values.nationalCode,
        captchaInput: values.captchaInput,
        encryptedResponse: encryptedResponse || "",
        referral,
      },
      {
        onSuccess: () => {
          setShowOtpInput(true);
          formik.setFieldValue("showOtpInput", true);
          toast.success("کد تایید با موفقیت ارسال شد");
          formik.setFieldValue("captchaInput", "");
          setEncryptedResponse("");
        },
        onError: (error: AxiosError<unknown>) => {
          const errorMessage = (error.response?.data as ErrorResponse)?.error;
          Toast(
            errorMessage || "خطایی رخ داده است",
            <ErrorIcon />,
            "bg-red-500"
          );
          formik.setFieldValue("captchaInput", "");
          setEncryptedResponse("");
          refetch();
        },
      }
    );
  };

  const handleNationalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    formik.setFieldValue("nationalCode", value);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputLogin
        type="text"
        label="کدملی"
        placeholder="کدملی"
        value={formik.values.nationalCode}
        disabled={showOtpInput}
        onChange={handleNationalCodeChange}
        name="nationalCode"
        error={
          formik.touched.nationalCode && formik.errors.nationalCode
            ? String(formik.errors.nationalCode)
            : undefined
        }
        maxLength={10}
      />
      {!showOtpInput && (
        <>
          <InputLogin
            type="text"
            label="کد امنیتی"
            value={formik.values.captchaInput}
            onChange={formik.handleChange}
            name="captchaInput"
            error={
              formik.touched.captchaInput && formik.errors.captchaInput
                ? String(formik.errors.captchaInput)
                : undefined
            }
          />
          <CaptchaImg setEncryptedResponse={setEncryptedResponse} />
          <motion.button
            className="inline-block w-full mt-5 rounded px-4 py-3 text-md font-medium uppercase bg-blue-950 leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-900"
            type="submit"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#1e3a8a",
            }}
            whileTap={{
              scale: 0.98,
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#1e3a8a",
            }}
            {...fadeIn(0.4, 0, 0.4)}
          >
            {signupPending ? <Spinner /> : "ثبت نام"}
          </motion.button>
        </>
      )}
      {showOtpInput && (
        <>
          <InputLogin
            type="text"
            label="کد تایید"
            placeholder="کد تایید را وارد کنید"
            value={formik.values.otp}
            onChange={formik.handleChange}
            name="otp"
            error={
              formik.touched.otp && formik.errors.otp
                ? String(formik.errors.otp)
                : undefined
            }
          />
          <motion.div {...fadeIn(0.4, 0, 0.4)} className="mb-6 text-center">
            <button
              type="submit"
              className="inline-block w-full mt-5 rounded px-4 py-3 text-md font-medium uppercase bg-blue-950 leading-normal text-white shadow-md transition duration-150 ease-in-out"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              {registerPending ? <Spinner /> : "تایید و ثبت نام"}
            </button>
          </motion.div>
        </>
      )}
    </form>
  );
};

export default SignupForm;
