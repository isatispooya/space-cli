import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { fadeIn } from "../animations/fadeIn";

interface InputLoginProps extends HTMLMotionProps<"div"> {
  type?: string;
  placeholder?: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputLogin: React.FC<InputLoginProps> = ({
  type = "text",
  placeholder,
  label,
  value,
  onChange,
  ...motionProps
}) => {
  return (
    <motion.div
      {...fadeIn(1.4, -20)}
      className="relative mb-3"
      data-twe-input-wrapper-init
      {...motionProps}
    >
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="peer block w-full border-b-2 bg-transparent px-2 py-1.5 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder:text-neutral-300 [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
        placeholder={placeholder}
        aria-label={label}
      />
      <label className="pointer-events-none absolute right-3 top-1 text-sm text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.8rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400">
        {label}
      </label>
    </motion.div>
  );
};

export default InputLogin;
