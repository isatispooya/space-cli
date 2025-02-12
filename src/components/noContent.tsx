import React from 'react';
import { motion } from 'framer-motion';

interface NoContentPropsTypes {
  label: string; 
}

const NoContent: React.FC<NoContentPropsTypes> = ({ label }) => {
  return (
    <motion.div
      className="p-4 text-center text-gray-500 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Static SVG Icon */}
      <div className="mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Dynamic Label */}
      <p>{label}</p>
    </motion.div>
  );
};

export default NoContent;