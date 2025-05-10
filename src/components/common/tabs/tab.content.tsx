import React from "react";

interface TabContentPropsType {
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentPropsType> = ({ children }) => {
  return <div>{children}</div>;
};

export default TabContent;
