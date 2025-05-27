export type ButtonBasePropsType = {
  onClick: () => void;
  label: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;

  bgColor?: string;
  hoverColor?: string;
  icon?: React.ReactNode;
  className?: string;
};
