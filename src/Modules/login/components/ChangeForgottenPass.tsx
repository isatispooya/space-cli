import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InputLogin from "./inputLogin";
import useChangePass from "../hooks/useChangePass";
import { ResetPassParams } from "../types/forgetPass.type";

const ChangeForgottenPass: React.FC = () => {
  const [newPass, setNewPass] = useState<string>("");
  const [confirmNewPass, setConfirmNewPass] = useState<string>("");

  const { uuid = "" } = useParams();
  const { mutate: changePassMutate } = useChangePass(uuid);

  const handleChangePass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resetPassData: ResetPassParams = { newPass, confirmNewPass };
    changePassMutate(resetPassData);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // your change handler code
  };

  return (
    <form onSubmit={handleChangePass}>
      <InputLogin
        type="password"
        label="رمز عبور جدید"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />
      <InputLogin
        type="password"
        label="تکرار رمز عبور جدید"
        value={confirmNewPass}
        onChange={(e) => setConfirmNewPass(e.target.value)}
      />

      <button
        className="inline-block w-full mt-5 rounded px-4 py-2 bg-gradient-to-r from-[#295270] to-[#524175] text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
        type="submit"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        تغییر رمز ورود
      </button>
    </form>
  );
};

export default ChangeForgottenPass;
