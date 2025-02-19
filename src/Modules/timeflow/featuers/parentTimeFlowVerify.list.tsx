import { useTimeflow } from "../hooks";
import { List } from "../components";
import { UserLoginType } from "../types";
import dayjs, { Dayjs } from "dayjs";
import toast from "react-hot-toast";

const ParentTimeFlowVerify: React.FC<{ userLogin: UserLoginType }> = ({
  userLogin,
}) => {
  const { mutate: updateUsersLoginByParent } =
    useTimeflow.useUpdateUsersLoginByParent();

  const handleAccept = (logId: number, selectedTime: Dayjs) => {
    const payload = {
      time_parent: selectedTime.format("YYYY-MM-DDTHH:mm:ss"),
    };
    updateUsersLoginByParent(
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

  return (
    <>
      {userLogin?.other_logs ? (
        <List
          logs={userLogin.other_logs.map((log) => ({
            id: log.id,
            user: log.user,
            time_parent: dayjs(log.time_parent),
            type: log.type as "login" | "logout",
          }))}
          onAccept={handleAccept}
        />
      ) : null}
    </>
  );
};

export default ParentTimeFlowVerify;
