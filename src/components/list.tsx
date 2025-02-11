import React from "react";
import { motion } from "framer-motion";

interface DynamicListProps {
  items: string[];
  onItemClick: (item: string) => void;
}

const DynamicList: React.FC<DynamicListProps> = ({ items, onItemClick }) => {
  return (
    <div className="p-4">
      <ul>
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-2 border-b cursor-pointer"
            onClick={() => onItemClick(item)}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicList;
