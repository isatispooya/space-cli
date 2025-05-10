import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { fadeIn } from "../../../Modules/auth/animations/fadeIn";

interface InputLinePropsType extends HTMLMotionProps<"div"> {
  type?: string;
  placeholder?: string;
  name?: string;
  label: string;
  error?: string;
  value?: string | number | undefined | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  maxLength?: number;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputBase: React.FC<InputLinePropsType> = ({
  type = "text",
  label,
  value,
  name,
  onChange,
  onBlur,
  disabled,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,

  maxLength,
  ...motionProps
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <motion.div
      {...fadeIn(0.4, -20, 0.4)}
      className="relative mb-3"
      data-twe-input-wrapper-init
      onClick={() => inputRef.current?.focus()}
      {...motionProps}
    >
      <input
        type={type}
        ref={inputRef}
        value={value ?? ""}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        className="peer px-7 w-full bg-gray-100 placeholder:text-slate-400 text-slate-700 text-sm rounded-lg transition duration-300 ease focus:outline-none py-4 focus:border-slate-400 hover:border-slate-300 shadow-inner focus:shadow"
        placeholder=" "
        aria-label={label}
        disabled={disabled}
        maxLength={maxLength}
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

export default InputBase;
