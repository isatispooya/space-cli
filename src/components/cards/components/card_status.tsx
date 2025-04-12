import { StatusProps } from "../types/card.type";

const statusStyles = {
  success: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  warning:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  error: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
};

export const CardStatus = ({ type, message }: StatusProps) => (
  <div className={`mx-6 mb-4 p-3 rounded-lg ${statusStyles[type]}`}>
    {message}
  </div>
);
