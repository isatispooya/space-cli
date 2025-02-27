import { toast } from "react-hot-toast";
import { Dispatch } from "redux";
import { 
  updateOwnLogStatus, 
  updateOtherLogStatus,
  clearSelectedOwnTime,
  clearSelectedOtherTime
} from "../store/verifySlice";
import { formatTimeForAPI } from "./timeUtils";

/**
 * Updates own log time through API
 */
export const updateOwnLogTime = (
  logId: number,
  time: Date | null,
  updateUser: any,
  dispatch: Dispatch
) => {
  const formattedTime = formatTimeForAPI(time);
  
  if (!formattedTime) {
    toast.error("زمان معتبری وجود ندارد.");
    return;
  }
  
  updateUser(
    { id: logId, data: { time_user: formattedTime } },
    {
      onSuccess: () => {
        dispatch(updateOwnLogStatus({ logId, time: formattedTime }));
        dispatch(clearSelectedOwnTime(logId));
        toast.success("زمان با موفقیت به‌روزرسانی شد.");
      },
      onError: () => {
        toast.error("خطا در به‌روزرسانی زمان.");
      },
    }
  );
};

/**
 * Updates other log time through API
 */
export const updateOtherLogTime = (
  logId: number,
  time: Date | null,
  logType: string,
  updateParent: any,
  updateLogoutParent: any,
  dispatch: Dispatch
) => {
  const formattedTime = formatTimeForAPI(time);
  
  if (!formattedTime) {
    toast.error("زمان معتبری وجود ندارد.");
    return;
  }
  
  const updateMutation = logType === "logout" ? updateLogoutParent : updateParent;
  
  updateMutation(
    { id: logId, data: { time_parent: formattedTime } },
    {
      onSuccess: () => {
        dispatch(updateOtherLogStatus({ logId, time: formattedTime }));
        dispatch(clearSelectedOtherTime(logId));
        toast.success("زمان زیرمجموعه با موفقیت به‌روزرسانی شد.");
      },
      onError: () => {
        toast.error("خطا در به‌روزرسانی زمان زیرمجموعه.");
      },
    }
  );
};