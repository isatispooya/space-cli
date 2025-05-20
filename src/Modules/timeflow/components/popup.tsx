import React from "react";
import { Dialog } from "../../../components/modals";
import { useNavigate } from "react-router-dom";
import { useTimeflow } from "../hooks";

interface PopupType {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupType> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { data: userLogin } = useTimeflow.useGetUsersLogin();
  const { data: timeflowParent } = useTimeflow.useGetTimeflowDetails();

  const handleNavigateToVerifyTable = () => {
    navigate("/timeflow/list/");
    onClose();
  };

  const ReminderIcon = () => (
    <div className="mb-6 text-blue-500 dark:text-blue-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 animate-pulse"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );

  const PendingApprovalsReminder = () => (
    <div className="mt-5 pt-5 w-full">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 text-center">
        تردد زیرمجموعه‌ها نیاز به تایید دارد
      </h3>

      <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
        <span className="font-bold text-indigo-700 dark:text-indigo-500">
          {userLogin?.other_logs?.filter(
            (log) => log.status_parent === "pending"
          ).length || 0}
        </span>{" "}
        تردد زیرمجموعه در انتظار تایید شماست. لطفاً هر چه سریعتر رسیدگی کنید.
      </p>

      <button
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700"
        onClick={handleNavigateToVerifyTable}
      >
        تایید تردد زیرمجموعه‌ها
      </button>
    </div>
  );

  const DismissButton = () => (
    <div className="mt-5 w-full">
      <button
        className="w-full border border-gray-300 text-gray-700 dark:text-gray-200 dark:border-gray-600 py-2.5 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800"
        onClick={onClose}
      >
        بعداً یادآوری کن
      </button>
    </div>
  );

  if (!timeflowParent) {
    return null;
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      animation="scale"
      header="یادآوری سیستم تردد"
      hideFooter
      contentClassName="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      <div className="absolute -top-28 -left-24 w-64 h-64 rounded-full bg-blue-200 opacity-30 dark:bg-blue-700 dark:opacity-20"></div>

      <div className="flex flex-col items-center py-5 px-2 relative z-10">
        <ReminderIcon />
        <PendingApprovalsReminder />
        <DismissButton />
      </div>
    </Dialog>
  );
};

export default Popup;
