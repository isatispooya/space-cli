import { FC, ReactNode } from "react";
import TaskBarType from "../types/taskbar.type";


interface CreateCustomToolPropsType {
    id: string;
    icon: ReactNode;
    label: string;
    onClick: () => void;
    variant?: TaskBarType["buttonVariantType"];
    order?: number;
  }
export const createCustomTool = ({
  id,
  icon,
  label,
  onClick,
  variant = "nav",
  order,
}: CreateCustomToolPropsType): TaskBarType["customTools"][0] => {
  return {
    id,
    icon,
    label,
    onClick,
    variant,
    order,
  };
};

export const createCustomTools = (
  tools: CreateCustomToolPropsType[]
): TaskBarType["customTools"] => {
  return tools.map(createCustomTool);
};

export default {
  createCustomTool,
  createCustomTools,
};
