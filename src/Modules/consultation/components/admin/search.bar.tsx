import { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { BiGlasses } from "react-icons/bi";

interface AdminSearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AdminSearchBar = ({ value, onChange }: AdminSearchBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full mb-6"
    >
      <BiGlasses className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search for consultation topics..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
      />
    </motion.div>
  );
};

export default AdminSearchBar;
