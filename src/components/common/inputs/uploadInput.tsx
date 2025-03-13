import React, { useRef } from "react";
import { motion } from "framer-motion";
import { BiCloudUpload } from "react-icons/bi";

interface FileInputProps {
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  accept?: string;
  value?: File | null | undefined;
  disabled?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  className = "",
  accept,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
    onChange(e);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`w-full max-w-sm min-w-[160px] mt-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-500 mb-1">
          {label}
        </label>
      )}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleClick}
        className="relative w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded px-4 py-2 transition duration-300 ease hover:border-slate-400 shadow-sm cursor-pointer flex items-center"
      >
        <BiCloudUpload className="ml-2 text-xl text-slate-400" />
        <span className="truncate">{fileName || "انتخاب فایل"}</span>
      </motion.div>
      <input
        ref={inputRef}
        type="file"
        value={value ? "" : undefined}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
        accept={accept}
      />
    </div>
  );
};

export default FileInput;
