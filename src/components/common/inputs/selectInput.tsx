import { motion } from "framer-motion";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { useState, useEffect, useMemo } from "react";

interface OptionType {
  value: string;
  label: string;
}

interface SelectInputPropsType {
  options: readonly OptionType[] | OptionType[];
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputPropsType> = ({
  options,
  label,
  value,
  onChange,
  className = "",
  placeholder = "جستجو...",
  disabled = false,
}: SelectInputPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = useMemo(() => {
    return options.filter((option: OptionType) =>
      option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".select-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedValue: string) => {
    if (!disabled) {
      onChange?.(selectedValue);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const selectedOption = options.find((opt) => opt.value === value);

  // محاسبه ارتفاع برای دراپ‌دان با توجه به تعداد گزینه‌ها - حداکثر 3 آیتم
  const getOptionHeight = (count: number) => {
    const optionHeight = 36; // ارتفاع هر آیتم
    const maxVisibleItems = 3; // حداکثر تعداد آیتم‌های قابل نمایش
    const totalItems = Math.min(count, maxVisibleItems);
    return totalItems * optionHeight;
  };

  return (
    <div
      className={`w-full max-w-sm min-w-[160px] mt-1 ${className} ${
        disabled ? " cursor-none opacity-80" : ""
      }`}
    >
      {label && (
        <label className="block text-sm font-medium text-slate-500 mb-1">
          {label}
        </label>
      )}
      <div className="relative select-container">
        <motion.div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          whileHover={{ scale: disabled ? 1 : 1.01 }}
          whileTap={{ scale: disabled ? 1 : 0.99 }}
          className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded pl-8 pr-2 py-2 transition duration-300 ease hover:border-slate-400 shadow-sm cursor-pointer flex items-center justify-between"
        >
          <span>{selectedOption?.label || "انتخاب کنید"}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <BiChevronDown size={20} />
          </motion.div>
        </motion.div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded shadow-lg"
          >
            <div className="p-2 border-b border-slate-200">
              <div className="relative">
                <BiSearch className="absolute left-2 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={placeholder}
                  className="w-full pl-8 pr-2 py-2 text-sm border border-slate-200 rounded focus:outline-none focus:border-slate-400"
                />
              </div>
            </div>
            <div 
              className="overflow-y-auto"
              style={{ 
                maxHeight: `${getOptionHeight(filteredOptions.length)}px`,
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e1 #f8fafc'
              }}
            >
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-100 ${
                    option.value === value ? "bg-slate-50" : ""
                  }`}
                >
                  {option.label}
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className="px-4 py-2 text-sm text-slate-500">
                  موجود نیست
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
