import React from "react";

interface TabContentProps {
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default TabContent;
