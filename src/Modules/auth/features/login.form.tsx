import React, { FormEventHandler } from "react";
import useLogin from "../../auth/hooks/useLogin";
import toast, { Toaster } from "react-hot-toast";
import PassInput from "../components/passInput";
import InputBase from "../../../components/inputBase";
import Spinner from "../../../components/spinner";
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
          toast.success("ورود با موفقیت انجام شد");
        },
        onError: () => {
          toast.error("نام کاربری یا رمز عبور اشتباه است");
        },
      }
    );
  };

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <InputBase
          type="text"
          label="کدملی"
          placeholder="کدملی"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
        />
        <PassInput
          type="password"
          label="رمز عبور"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-2 text-left ml-1">
          <button
            onClick={() => handleComponentChange("forgetpass")}
            className="text-black-600 hover:text-blue-700 hover:underline text-sm"
          >
            رمز عبور خود را فراموش کرده‌اید؟
          </button>
        </div>
        <button
          className="inline-block w-full mt-5 rounded px-4 py-3 text-md font-medium uppercase bg-blue-950 leading-normal text-white shadow-md transition duration-150 ease-in-out"
          type="submit"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          {isPending ? <Spinner /> : "ورود"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
