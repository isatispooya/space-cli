import React from "react";
import { useTimeflow } from "../hooks";
import { LoginList } from "../components";
import { UserLoginType } from "../types";
import { Dayjs } from "dayjs";
const UserTimeflowVerify: React.FC<{ userLogin: UserLoginType }> = ({
  userLogin,
}) => {
  const { mutate: acceptTimeflow } = useTimeflow.useUserTimeflowAccept();

  const handleAccept = (logId: number, selectedTime: Dayjs) => {
    const payload = { time_user: selectedTime.format("YYYY-MM-DDTHH:mm:ss") };
    acceptTimeflow(
      { data: payload, id: logId },
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

  return (
    <>
      {userLogin?.own_logs ? (
        <LoginList logs={userLogin.own_logs} onAccept={handleAccept} />
      ) : null}
    </>
  );
};

export default UserTimeflowVerify;
