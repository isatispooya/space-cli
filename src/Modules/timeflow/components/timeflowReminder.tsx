import React from "react";
import { ReminderPopup } from ".";
import { useReminderPopup } from "../hooks";

const TimeflowReminder: React.FC = () => {
  const { isOpen, closePopup } = useReminderPopup();
  
  return <ReminderPopup isOpen={isOpen} onClose={closePopup} />;
};

export default TimeflowReminder; 