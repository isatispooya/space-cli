import React, { useEffect } from "react";
import { Tab, initTWE } from "tw-elements";
import ChangePasswordForm from "../feature/changeOldPass.form";

const Settings: React.FC = () => {
  useEffect(() => {
    initTWE({ Tab });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 mt-20 bg-gradient-to-br ">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 border-b-2 pb-4">
        تغییر رمز عبور
      </h2>
      
      <div className="w-full">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default Settings;
