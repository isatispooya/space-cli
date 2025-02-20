import React from "react";
import { useTimeflow } from "../hooks";

import { Dayjs } from "dayjs";
import LogList from "./logout.list";
import toast from "react-hot-toast";
const VerifyLogout: React.FC = () => {
  const { mutate: UsersLogout } = useTimeflow.useUsersLogoutAccept();

  const handleAccept = (selectedTime: Dayjs) => {
    const payload = { time_user: selectedTime.format("YYYY-MM-DDTHH:mm:ss") };
    UsersLogout(
      { data: payload },
      {
        onSuccess: () => {
          toast.success("زمان با موفقیت تایید شد!");
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
