import { useState, useEffect } from "react";
import { useTimeflow } from ".";

const POPUP_STORAGE_KEY = "timeflow_reminder_last_shown";
const REMINDER_DELAY_HOURS = 4; // نمایش مجدد پاپ‌آپ بعد از ۴ ساعت

/**
 * هوک مدیریت نمایش پاپ‌آپ یادآوری ثبت تردد
 * این هوک بررسی می‌کند که آیا کاربر تردد ثبت کرده یا زیرمجموعه‌ها را تایید کرده است
 * و در صورت نیاز، پاپ‌آپ یادآوری را نمایش می‌دهد
 */
const useReminderPopup = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: userLogin } = useTimeflow.useGetUsersLogin();
  
  // بررسی و نمایش پاپ‌آپ
  useEffect(() => {
    const checkAndShowPopup = () => {
      // بررسی وضعیت ثبت تردد و تایید زیرمجموعه‌ها
      if (userLogin && Array.isArray(userLogin.other_logs)) {
        const today = new Date().toISOString().split('T')[0]; // فقط تاریخ امروز
        
        // بررسی آیا کاربر امروز ورود ثبت کرده است
        const hasLoginToday = userLogin.other_logs.some(log => {
          const logDate = new Date(log.time_user).toISOString().split('T')[0];
          return logDate === today && log.type === "login";
        });
        
        // بررسی آیا تردد زیرمجموعه‌ها که نیاز به تایید دارند وجود دارد
        const hasPendingSubordinates = userLogin.other_logs.some(log => 
          log.status_parent === "pending"
        );
        
        // اگر امروز ورود ثبت نشده یا تردد زیرمجموعه تایید نشده وجود دارد، پاپ‌آپ را نمایش بده
        if (!hasLoginToday || hasPendingSubordinates) {
          setIsOpen(true);
        }
      }
    };
    
    // نمایش پاپ‌آپ بلافاصله بعد از بارگذاری صفحه
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