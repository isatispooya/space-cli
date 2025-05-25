import { useState, useEffect } from "react";
import { useTimeflow } from ".";

const useReminderPopup = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: userLogin } = useTimeflow.useGetUsersLogin();

  useEffect(() => {
    const isValidDate = (dateStr: string): boolean => {
      const date = new Date(dateStr);
      return date instanceof Date && !isNaN(date.getTime());
    };

    const checkAndShowPopup = () => {
      if (userLogin && Array.isArray(userLogin.other_logs)) {
        const today = new Date().toISOString().split("T")[0];

        const hasLoginToday = userLogin.other_logs.some((log) => {
          if (!log.time_user || !isValidDate(log.time_user)) {
            return false;
          }
          const logDate = new Date(log.time_user).toISOString().split("T")[0];
          return logDate === today && log.type === "login";
        });

        const hasPendingSubordinates = userLogin.other_logs.some(
          (log) => log.status_parent === "pending"
        );

        if (!hasLoginToday || hasPendingSubordinates) {
          setIsOpen(true);
        }
      }
    };

    checkAndShowPopup();
  }, [userLogin]);

  const closePopup = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    closePopup,
  };
};

export default useReminderPopup;
