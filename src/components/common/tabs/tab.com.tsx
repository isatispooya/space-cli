import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TabItem from "./tab.item";
import TabContent from "./tab.content";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabComponentProps {
  tabs: Tab[];
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

  const handleTabClick = (tabId: string) => {
    if (!tabs.find((tab) => tab.id === tabId)?.disabled) {
      setActiveTab(tabId);
    }
  };

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <ul
        className="flex flex-wrap overflow-x-auto text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 sm:flex-nowrap"
        style={{ scrollbarWidth: "none" }} // Hide scrollbar for horizontal scrolling
      >
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            label={tab.label}
            isActive={tab.id === activeTab}
            isDisabled={!!tab.disabled}
            onClick={() => handleTabClick(tab.id)}
          />
        ))}
      </ul>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="p-4 min-h-[200px] bg-white dark:bg-gray-900 rounded-lg shadow-md"
        >
          <TabContent>{activeContent}</TabContent>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TabComponent;
