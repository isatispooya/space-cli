import { useState, useEffect } from "react";
import { useTimeflow } from ".";

const useReminderPopup = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: userLogin } = useTimeflow.useGetUsersLogin();
  
  useEffect(() => {
    const checkAndShowPopup = () => {
      if (userLogin && Array.isArray(userLogin.other_logs)) {
        const today = new Date().toISOString().split('T')[0];
        
        const hasLoginToday = userLogin.other_logs.some(log => {
          const logDate = new Date(log.time_user).toISOString().split('T')[0];
          return logDate === today && log.type === "login";
        });
        
        const hasPendingSubordinates = userLogin.other_logs.some(log => 
          log.status_parent === "pending"
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
    closePopup
  };
};

export default useReminderPopup; 