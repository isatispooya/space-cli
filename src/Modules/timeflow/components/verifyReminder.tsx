import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTimeflow } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { setOwnLogs, setOtherLogs } from "../store/verifySlice";
import { RootState } from "../../../store/store";
import Dialog from "../../../components/modals/dialog";

const REMINDER_STORAGE_KEY = "verifyReminderShown";

const VerifyReminder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ownLogs, otherLogs } = useSelector(
    (state: RootState) => state.verify
  );

  const { data: userLogins, isLoading } = useTimeflow.useGetUsersLogin();

  const notApprovedOwnLogs = ownLogs.filter(
    (log) => log.status_self === "pending"
  );
  const notApprovedOtherLogs = otherLogs.filter(
    (log) => log.status_parent === "pending"
  );

  useEffect(() => {
    if (userLogins) {
      dispatch(
        setOwnLogs(
          userLogins.own_logs.map((log) => ({ ...log, isOwnLog: true })) || []
        )
      );
      dispatch(
        setOtherLogs(
          userLogins.other_logs.map((log) => ({ ...log, isOwnLog: false })) ||
            []
        )
      );
    }
  }, [userLogins, dispatch]);

  useEffect(() => {
    const hasShownReminder = localStorage.getItem(REMINDER_STORAGE_KEY);

    if (!isLoading && !hasShownReminder && userLogins) {
      const hasOwnLogs =
        notApprovedOwnLogs.filter((log) => log.type !== "logout").length > 0;
      const hasOtherLogs = notApprovedOtherLogs.length > 0;
      const hasAbsenceLogs =
        userLogins?.own_absence && userLogins.own_absence.length > 0;

      if (hasOwnLogs || hasOtherLogs || hasAbsenceLogs) {
        setIsOpen(true);
      }
    }
  }, [isLoading, userLogins, notApprovedOwnLogs, notApprovedOtherLogs]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(REMINDER_STORAGE_KEY, "true");
  };

  const handleGoToVerify = () => {
    setIsOpen(false);
    localStorage.setItem(REMINDER_STORAGE_KEY, "true");
    navigate("/timeflow/verify");
  };

  if (!isOpen) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      size="sm"
      header="یادآوری تایید ورود و خروج"
      animation="scale"
      closeOnOutsideClick={true}
 
      showCloseButton={true}
      footer={
        <div className="flex gap-2 justify-end w-full">
          <button
            onClick={handleGoToVerify}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          >
            رفتن به صفحه تایید
          </button>
        </div>
      }
    >
      <div className="py-4">
        <p className="text-gray-700 text-right">
          شما گزارش‌های تایید نشده دارید. لطفا آنها را بررسی کنید.
        </p>
        <div className="mt-4 space-y-2">
          {notApprovedOwnLogs.length > 0 && (
            <p className="text-sm text-gray-600 text-right">
              • {notApprovedOwnLogs.length} گزارش شخصی تایید نشده
            </p>
          )}
          {notApprovedOtherLogs.length > 0 && (
            <p className="text-sm text-gray-600 text-right">
              • {notApprovedOtherLogs.length} گزارش دیگران در انتظار تایید شما
            </p>
          )}
          {userLogins?.own_absence && userLogins.own_absence.length > 0 && (
            <p className="text-sm text-gray-600">
              • {userLogins.own_absence.length} گزارش غیبت در انتظار تایید
            </p>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default VerifyReminder;
