import React, { FormEventHandler } from "react";
import InputLogin from "./inputLogin"; 
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const { mutate, isError } = useLogin();
  const [password, setPassword] = React.useState("");
  const [nationalCode, setNationalCode] = React.useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!nationalCode.trim() || !password.trim()) {
      alert("لطفا تمام فیلدها را پر کنید");
      return;
    }

    if (nationalCode.length !== 10) {
      alert("کد ملی باید ۱۰ رقم باشد");
      return;
    }

    mutate({
      nationalCode,
      password,
    });
  };

  React.useEffect(() => {
    if (isError) {
      alert("نام کاربری یا رمز عبور اشتباه است");
    }
  }, [isError]);

  return (
    <form onSubmit={handleSubmit}>
      <InputLogin
        type="text"
        label="کدملی"
        placeholder="کدملی"
        value={nationalCode}
        onChange={(e) => setNationalCode(e.target.value)}
      />
      <InputLogin
        type="password"
        label="رمز عبور"
        placeholder="رمز عبور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="inline-block w-full mt-5 rounded px-4 py-2 bg-gradient-to-r from-[#295270] to-[#524175] text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
        type="submit"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        ورود
      </button>
    </form>
  );
};

export default LoginForm;
