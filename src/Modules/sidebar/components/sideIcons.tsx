import { ProSidebarProvider } from "react-pro-sidebar";
import { useState } from "react";
import SidebarIcons from "./SidebarIcons";
import ExpandableMenu from "./ExpandableMenu";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ProSidebarProvider>
      <div className="flex h-screen">
        <SidebarIcons onToggleCollapse={handleToggleCollapse} />
        <ExpandableMenu collapsed={collapsed} />
      </div>
    </ProSidebarProvider>
  );
};

export default Sidebar;
