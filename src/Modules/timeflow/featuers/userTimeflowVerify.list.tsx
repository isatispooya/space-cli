import React from "react";
import { useTimeflow } from "../hooks";
import { List } from "../components";
import { UserLoginType } from "../types";
import { Dayjs } from "dayjs";
import toast from "react-hot-toast";
import dayjs from "dayjs";

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
          toast.success("زمان با موفقیت تایید شد!");
        },
        onError: () => {
          toast.error("خطا در تایید زمان. لطفاً دوباره تلاش کنید.");
        },
      }
    );
  };

  const formattedLogs = userLogin.own_logs
    .filter((log) => log.type === "login")
    .map((log) => ({
      id: log.id,
      user: log.user,
      time_parent: dayjs(log.time_parent),
      type: log.type as "login" | "logout",
    }));

  return (
    <>
      {userLogin?.own_logs?.filter((log) => log.type === "login") ? (
        <List logs={formattedLogs} onAccept={handleAccept} />
      ) : null}
    </>
  );
};

export default UserTimeflowVerify;
