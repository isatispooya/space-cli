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
  label,
  value,
  onChange,
  ...motionProps
}) => {
  return (
    <motion.div
      {...fadeIn(1.4, -20)}
      className="relative mb-6"
      data-twe-input-wrapper-init
      {...motionProps}
    >
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="peer block w-full border-b-2 bg-transparent px-4 py-2 leading-7 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder:text-neutral-300 [&:not(:placeholder-shown)]:placeholder:opacity-0"
        placeholder=" "
        aria-label={label}
      />
      <label
        className={`pointer-events-none absolute right-4 top-2 text-base text-neutral-500 transition-all duration-200 ease-out transform
          ${
            value
              ? "-translate-y-[1.5rem] scale-90 text-primary"
              : "translate-y-0 scale-100 text-neutral-500"
          }`}
      >
        {label}
      </label>
    </motion.div>
  );
};

export default InputLogin;  
