import * as React from "react";

interface TabButtonProps {
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
}

const TabButton: React.FC<TabButtonProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center mb-4 space-x-4">
      <button
        className={`py-2 px-4 ${
          activeTab === "login" ? "font-bold text-blue-500" : ""
        }`}
        onClick={() => onTabChange("login")}
      >
        ورود
      </button>
      <button
        className={`py-2 px-4 ${
          activeTab === "signup" ? "font-bold text-blue-500" : ""
        }`}
        onClick={() => onTabChange("signup")}
      >
        ثبت نام
      </button>
    </div>
  );
};

export default TabButton;
