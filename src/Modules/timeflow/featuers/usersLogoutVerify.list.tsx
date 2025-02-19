import React from "react";
import { useTimeflow } from "../hooks";

import { Dayjs } from "dayjs";
import LogList from "../components/logout.list";
const UserLogoutVerify: React.FC = () => {
  const { mutate: UsersLogout } = useTimeflow.useUsersLogoutAccept();

  const handleAccept = ( selectedTime: Dayjs) => {
    const payload = { time_user: selectedTime.format("YYYY-MM-DDTHH:mm:ss") };
    UsersLogout(
      { data: payload },
      {
        onSuccess: () => {
          alert("زمان با موفقیت تایید شد!");
        },
        onError: (error) => {
          console.error("خطا در تایید زمان:", error);
          alert("خطا در تایید زمان. لطفاً دوباره تلاش کنید.");
        },
      }
    );
  };

  return <LogList onAccept={handleAccept} />;
};

export default UserLogoutVerify;
