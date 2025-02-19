import React from "react";

interface TabItemProps {
  label: string;
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({
  label,
  isActive,
  isDisabled,
  onClick,
}) => {
  return (
    <li className="me-2">
      <button
        onClick={onClick}
        className={`inline-block p-4 rounded-t-lg ${
          isActive
            ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
            : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        } ${
          isDisabled
            ? "cursor-not-allowed text-gray-400 dark:text-gray-500"
            : ""
        }`}
        disabled={isDisabled}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </button>
    </li>
  );
};

export default TabItem;
