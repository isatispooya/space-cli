import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { fadeIn } from "../animations/fadeIn";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputLineProps extends HTMLMotionProps<"div"> {
  type?: string;
  placeholder?: string;
  label: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const PassInput: React.FC<InputLineProps> = ({
  label,
  value,
  onChange,
  onBlur,
  disabled,
  name,
  ...motionProps
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <motion.div
      {...fadeIn(0.4, -20, 0.4)}
      className="relative mb-3"
      data-twe-input-wrapper-init
      {...motionProps}
    >
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 z-10"
      >
        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </button>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        className="peer px-7 pl-9 w-full bg-gray-100 placeholder:text-slate-400 text-slate-700 text-sm rounded-lg transition duration-300 ease focus:outline-none py-4 focus:border-slate-400 hover:border-slate-300 shadow-inner focus:shadow"
        placeholder=" "
        aria-label={label}
        disabled={disabled}
      />
      <label
        className={`absolute cursor-text px-1 pt-1 right-2.5 text-slate-400 text-sm transition-all transform origin-right
          ${value ? "-top-2 right-2.5 text-xs scale-90" : "top-3"} 
          peer-focus:-top-2 peer-focus:right-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90`}
      >
        {label}
      </label>
    </motion.div>
  );
};

export default PassInput;
