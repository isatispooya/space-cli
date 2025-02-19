import React from "react";
import { useTimeflow } from "../hooks";
import { List } from "../components";
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
      {userLogin?.own_logs?.filter((log) => log.type === "login") ? (
        <List
          logs={userLogin.own_logs.filter((log) => log.type === "login")}
          onAccept={handleAccept}
        />
      ) : null}
    </>
  );
};

export default UserTimeflowVerify;
