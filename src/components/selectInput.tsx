import { motion } from "framer-motion";
import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  options: readonly Option[] | Option[];
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const SelectInput = ({
  options,
  label,
  value,
  onChange,
  className = "",
}: SelectInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`w-full max-w-sm min-w-[160px] mt-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-500 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <motion.select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-8 pr-2 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </motion.select>
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{
            opacity: 1,
            rotate: isFocused ? 180 : 0,
          }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-2.5 left-2.5 text-slate-700"
        >
          <BiChevronDown size={20} />
        </motion.div>
      </div>
    </div>
  );
};

export default SelectInput;
