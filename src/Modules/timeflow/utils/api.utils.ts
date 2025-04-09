/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-hot-toast";
import { Dispatch } from "redux";
import {
  updateOwnLogStatus,
  updateOtherLogStatus,
  clearSelectedOwnTime,
  clearSelectedOtherTime,
} from "../store/verifySlice";
import { formatTimeForAPI } from "./time.utils";

/**
 * Updates own log time through API
 */
export const updateOwnLogTime = (
  logId: number,
  time: Date | null | string,
  updateUser: any,
  dispatch: Dispatch
) => {
  // Special case for rejection/skip
  if (time === null) {
    // Use empty string instead of null for the API
    updateUser(
      { id: logId, data: { time_user: "" } },
      {
        onSuccess: () => {
          dispatch(updateOwnLogStatus({ logId, time: "" }));
          dispatch(clearSelectedOwnTime(logId));
          toast.success("با موفقیت رد شد.");
        },
        onError: () => {
          toast.error("خطا در به‌روزرسانی زمان.");
        },
      }
    );
    return;
  }

  // Handle other cases
  let formattedTime: string | null = null;
  if (time === "") {
    formattedTime = "";
  } else if (typeof time === "string") {
    // Convert string to Date if needed
    formattedTime = formatTimeForAPI(time === null ? null : new Date(time));
  } else {
    formattedTime = formatTimeForAPI(time);
  }

  if (formattedTime === null) {
    toast.error("زمان معتبری وجود ندارد.");
    return;
  }

  // At this point, formattedTime is not null, so it must be a string
  updateUser(
    { id: logId, data: { time_user: formattedTime } },
    {
      onSuccess: () => {
        // Use type assertion to tell TypeScript that formattedTime is a string
        dispatch(updateOwnLogStatus({ logId, time: formattedTime as string }));
        dispatch(clearSelectedOwnTime(logId));
        toast.success("زمان با موفقیت به‌روزرسانی شد.");
      },
      onError: () => {
        toast.error("خطا در به‌روزرسانی زمان.");
      },
    }
  );
};

export const updateOtherLogTime = (
  logId: number,
  time: Date | null | string,
  logType: string,
  updateParent: any,
  updateLogoutParent: any,
  dispatch: Dispatch
) => {
  // Special case for rejection/skip
  if (time === null) {
    // Use empty string instead of null for the API
    const updateMutation =
      logType === "logout" ? updateLogoutParent : updateParent;

    updateMutation(
      { id: logId, data: { time_parent: "" } },
      {
        onSuccess: () => {
          dispatch(updateOtherLogStatus({ logId, time: "" }));
          dispatch(clearSelectedOtherTime(logId));
          toast.success("با موفقیت رد شد.");
        },
        onError: () => {
          toast.error("خطا در به‌روزرسانی زمان زیرمجموعه.");
        },
      }
    );
    return;
  }

  // Handle other cases
  let formattedTime: string | null = null;
  if (time === "") {
    formattedTime = "";
  } else if (typeof time === "string") {
    // Convert string to Date if needed
    formattedTime = formatTimeForAPI(time === null ? null : new Date(time));
  } else {
    formattedTime = formatTimeForAPI(time);
  }

  if (formattedTime === null) {
    toast.error("زمان معتبری وجود ندارد.");
    return;
  }

  const updateMutation =
    logType === "logout" ? updateLogoutParent : updateParent;

  updateMutation(
    { id: logId, data: { time_parent: formattedTime } },
    {
      onSuccess: () => {
        // Use type assertion to tell TypeScript that formattedTime is a string
        dispatch(
          updateOtherLogStatus({ logId, time: formattedTime as string })
        );
        dispatch(clearSelectedOtherTime(logId));
        toast.success("زمان زیرمجموعه با موفقیت به‌روزرسانی شد.");
      },
      onError: () => {
        toast.error("خطا در به‌روزرسانی زمان زیرمجموعه.");
      },
    }
  );
};
