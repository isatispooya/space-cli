import { ReceiveMessage } from "../../types/receive/ReceiveMessage.type";

const ExelData = (item: ReceiveMessage) => {
  return {
    عنوان: item.title || "نامشخص",
    گیرنده: item.receiver || "نامشخص",
    تاریخ_ارسال: item.send_date || "نامشخص",
    وضعیت: item.status || "نامشخص",
    نوع_پیام: item.message_type || "نامشخص",
    ارسال_کننده: item.sender || "نامشخص",
  };
};

export default ExelData;
