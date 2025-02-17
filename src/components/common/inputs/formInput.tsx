/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLMotionProps, motion } from "framer-motion";

interface FormInputProps extends HTMLMotionProps<"input"> {
  label?: string;
  format?: (value: any) => any;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}


const FormInput = ({
  label = "Input Label",
  format,
  value,
  disabled,
  onChange,
  ...props
}: FormInputProps) => {
  // Format the display value if a format function is provided
  const displayValue = format && value !== undefined ? format(value) : value;

  return (
    <div dir="rtl" className="w-full max-w-sm min-w-[150px]">
      <motion.label
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="block text-sm font-medium text-slate-500 mb-2"
      >
        {label}
      </motion.label>
      <motion.input
        {...props}
        value={displayValue || ""}
        onChange={onChange}
        disabled={disabled}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.995 }}
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />
    </div>
  );
};

export default FormInput;
