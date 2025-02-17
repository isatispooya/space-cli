import React, { FormEventHandler } from "react";
import useLogin from "../../auth/hooks/useLogin";
import toast, { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import PassInput from "../../../components/common/inputs/passInput";
import InputBase from "../../../components/common/inputs/inputBase";
import Spinner from "../../../components/loaders/spinner";
import { ErrorResponse } from "../../../types";
import { AxiosError } from "axios";
import { Toast } from "../../../components/common";
const LoginForm = ({
  handleComponentChange,
}: {
  handleComponentChange: (component: "login" | "signup" | "forgetpass") => void;
}) => {
  const { mutate, isPending } = useLogin();
  const [password, setPassword] = React.useState("");
  const [nationalCode, setNationalCode] = React.useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!nationalCode.trim() || !password.trim()) {
      toast.error("لطفا تمام فیلدها را پر کنید");
      return;
    }

    mutate(
      {
        nationalCode,
        password,
      },
      {
        onSuccess: () => {
          Toast("ورود با موفقیت انجام شد", <CheckmarkIcon />, "bg-green-500");
        },
        onError: (error: AxiosError<unknown>) => {
          const errorMessage = (error.response?.data as ErrorResponse)?.error;
          Toast(
            errorMessage || "نام کاربری یا رمز عبور اشتباه است",
            <ErrorIcon />,
            "bg-red-500"
          );
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="tour-login-form">
          <div className="tour-username ">
            <InputBase
              type="text"
              name="username"
              label="کدملی"
              placeholder="کدملی"
              value={nationalCode}
              onChange={(e) => setNationalCode(e.target.value)}
            />
          </div>
          <div className="tour-password">
            <PassInput
              type="password"
              name="password"
              label="رمز عبور"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="tour-login-button inline-block w-full mt-5 rounded px-4 py-3 text-md font-medium uppercase bg-blue-950 leading-normal text-white shadow-md transition duration-150 ease-in-out"
            type="submit"
            data-twe-ripple-init
            data-twe-ripple-color="light"
          >
            {isPending ? <Spinner /> : "ورود"}
          </button>
        </div>

        <div className="tour-forget-password flex items-center justify-start gap-2 mt-4 py-3">
          <button
            onClick={() => handleComponentChange("forgetpass")}
            className="text-gray-500 hover:text-red-600 font-medium transition-colors duration-200 relative group"
          >
            رمز عبور خود را فراموش کرده‌اید؟
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-200"></span>
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
