export type ButtonBaseProps = {
  onClick: () => void;
  label: string;
  type?: "button" | "submit" | "reset";
};
