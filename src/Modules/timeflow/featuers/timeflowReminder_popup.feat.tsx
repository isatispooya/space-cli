import React from "react";
import { Popup } from "../components";
import { useReminderPopup } from "../hooks";

const TimeflowReminderFeat: React.FC = () => {
  const { isOpen, closePopup } = useReminderPopup();

  return <Popup isOpen={isOpen} onClose={closePopup} />;
};

export default TimeflowReminderFeat;
