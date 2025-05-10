import { motion } from "framer-motion";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";

interface OptionType {
  value: string;
  label: string;
}

interface MultiSelectPropsType {
  options: OptionType[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  maxSelect?: number;
}

const MultiSelect: React.FC<MultiSelectPropsType> = ({
  options,
  selectedValues,
  onChange,
  label,
  className = "",
  placeholder = "جستجو...",
  disabled = false,
  maxSelect,
}: MultiSelectPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const filtered = options.filter((option: OptionType) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
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
      if (selectedValues.includes(selectedValue)) {
        onChange(selectedValues.filter((v) => v !== selectedValue));
      } else {
        if (!maxSelect || selectedValues.length < maxSelect) {
          onChange([...selectedValues, selectedValue]);
        }
      }
    }
  };

  const getSelectedLabels = () => {
    return selectedValues
      .map((value) => options.find((opt) => opt.value === value)?.label)
      .filter(Boolean)
      .join("، ");
  };

  return (
    <div
      className={`w-full max-w-sm min-w-[160px] mt-1 ${className} ${
        disabled ? "cursor-none opacity-80" : ""
      }`}
    >
      {label && (
        <label className="block text-sm font-medium text-slate-500 mb-1">
          {label}
          {maxSelect && (
            <span className="text-xs text-slate-400 mr-1">
              (حداکثر {maxSelect} مورد)
            </span>
          )}
        </label>
      )}
      <div className="relative select-container">
        <motion.div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          whileHover={{ scale: disabled ? 1 : 1.01 }}
          whileTap={{ scale: disabled ? 1 : 0.99 }}
          className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded pl-8 pr-2 py-2 transition duration-300 ease hover:border-slate-400 shadow-sm cursor-pointer flex items-center justify-between"
        >
          <span className="truncate">
            {selectedValues.length > 0 ? getSelectedLabels() : "انتخاب کنید"}
          </span>
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
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-100 flex items-center justify-between ${
                    selectedValues.includes(option.value) 
                      ? "bg-slate-50" 
                      : maxSelect && selectedValues.length >= maxSelect 
                      ? "opacity-50 cursor-not-allowed" 
                      : ""
                  }`}
                >
                  <span>{option.label}</span>
                  {selectedValues.includes(option.value) && (
                    <svg
                      className="w-4 h-4 text-[#29D2C7]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
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

export default MultiSelect;
