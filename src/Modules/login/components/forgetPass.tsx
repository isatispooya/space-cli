import React from "react";
import InputLogin from "./inputLogin";
import useResetPass from "../hooks/useResetPass";
import { useLoginStore } from "../store/loginStore";

const ForgetPass = () => {
  const { mutate } = useResetPass();

  const { nationalCode, setNationalCode } = useLoginStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ nationalCode });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputLogin
        type="text"
        label="کدملی"
        placeholder="کدملی"
        value={nationalCode}
        onChange={(e) => setNationalCode(e.target.value)}
      />

      <button
        className="inline-block w-full mt-5 rounded px-4 py-2 bg-gradient-to-r from-[#295270] to-[#524175] text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
        type="submit"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        ارسال کد بازیابی رمز
      </button>
    </form>
  );
};

export default ForgetPass;
