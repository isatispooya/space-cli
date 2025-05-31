import TaskBarType from "../types/taskbar.type";

export const buttonStyles: Record<TaskBarType["buttonVariantType"], string> = {
  excel: "bg-green-600 text-white hover:bg-green-500",
  refresh: "bg-blue-500 text-white hover:bg-blue-400",
  nav: "bg-gray-600 text-white hover:bg-gray-500",
};
