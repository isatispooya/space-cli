import React from "react";
import { ButtonBaseProps } from "@/types";

const ButtonBase: React.FC<ButtonBaseProps> = ({
  label,
  onClick,
  disabled,
  icon,
  bgColor = "rgb(30 41 59)", 
  hoverColor = "rgb(51 65 85)",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 flex items-center gap-2`}
      style={
        {
          backgroundColor: bgColor,
          "--hover-bg": hoverColor,
        } as React.CSSProperties
      }
      type="button"
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {label}
    </button>
  );
};

export default ButtonBase;
