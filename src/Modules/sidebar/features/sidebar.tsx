import { ProSidebarProvider } from "react-pro-sidebar";
import { useState } from "react";
import SidebarIcons from "../components/SidePanel";
import SideMenu from "../components/sideMenu";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ProSidebarProvider>
      <div>
        <SidebarIcons onToggleCollapse={handleToggleCollapse} />
        <SideMenu collapsed={collapsed} />
      </div>
    </ProSidebarProvider>
  );
};

export default SideBar;
