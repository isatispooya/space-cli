import React from "react";
import { useTimeflow } from "../hooks";

import { Dayjs } from "dayjs";
import LogList from "./logout.list";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const VerifyLogout: React.FC = () => {
  const { mutate: UsersLogout } = useTimeflow.useUsersLogoutAccept();
  const navigate = useNavigate();

  const handleAccept = (selectedTime: Dayjs) => {
    const payload = { time_user: selectedTime.format("YYYY-MM-DDTHH:mm:ss") };
    UsersLogout(
      { data: payload },
      {
        onSuccess: () => {
          toast.success("زمان با موفقیت تایید شد!");
          navigate("/login");
        },
        onError: () => {
          toast.error("خطا در تایید زمان. لطفاً دوباره تلاش کنید.");
        },
      }
    );
  };

  return <LogList onAccept={handleAccept} />;
};

export default VerifyLogout;
