import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  initialValue?: string;
  autoFocus?: boolean;
  debounceTime?: number;
  width?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  className = "",
  initialValue = "",
  autoFocus = false,
  debounceTime = 300,
  width = "w-full",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, debounceTime]);

  // Auto focus if enabled
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleClear = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div
      className={`relative flex items-center ${width} ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`absolute left-3 text-gray-400 transition-colors duration-200 ${
          isFocused ? "text-blue-500" : ""
        }`}
        whileHover={{ scale: 1.1 }}
      >
        <FiSearch size={18} />
      </motion.div>

      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 pl-10 pr-10 text-sm bg-white border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {searchTerm && (
        <motion.button
          className="absolute right-3 text-gray-400 hover:text-gray-600"
          onClick={handleClear}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiX size={18} />
        </motion.button>
      )}
    </motion.div>
  );
};

export default SearchInput;
