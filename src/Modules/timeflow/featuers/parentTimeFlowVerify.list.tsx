import { useTimeflow } from "../hooks";
import { List } from "../components";
import { UserLoginType } from "../types";
import moment from "moment";
import { Dayjs } from "dayjs";

const ParentTimeFlowVerify: React.FC<{ userLogin: UserLoginType }> = ({
  userLogin,
}) => {
  const { mutate: updateUsersLoginByParent } =
    useTimeflow.useUpdateUsersLoginByParent();

  const handleAccept = (logId: number, selectedTime: Dayjs) => {
    const payload = {
      time_parent: moment(selectedTime.toISOString()).format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
    };
    updateUsersLoginByParent(
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
      {userLogin?.other_logs ? (
        <List
          logs={userLogin.other_logs.map((log) => ({
            id: log.id,
            user: log.user,
            time_parent: log.time_parent,
            type: log.type as "login" | "logout",
          }))}
          onAccept={handleAccept}
        />
      ) : null}
    </>
  );
};

export default ParentTimeFlowVerify;
