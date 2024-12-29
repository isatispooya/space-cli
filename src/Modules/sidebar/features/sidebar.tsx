import { ProSidebarProvider } from "react-pro-sidebar";
import { useState } from "react";
import SidePanel from "../components/SidePanel";
import SideMenu from "../components/sideMenu";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ProSidebarProvider>
      <div>
        <SidePanel onToggleCollapse={handleToggleCollapse} />
        <SideMenu collapsed={collapsed} />

        
      </div>
    </ProSidebarProvider>
  );
};

export default SideBar;
