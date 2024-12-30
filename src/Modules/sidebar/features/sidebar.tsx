import { ProSidebarProvider } from "react-pro-sidebar";
import { useState, useEffect, useRef } from "react";
import SidePanel from "../components/SidePanel";
import SideMenu from "../components/sideMenu";
import { MenuItem } from "../data/menuItems";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState<MenuItem | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setCollapsed(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !collapsed
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapsed]);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ProSidebarProvider>
      <div ref={sidebarRef}>
        <SidePanel
          onToggleCollapse={handleToggleCollapse}
          onSectionChange={setActiveSection}
          collapsed={collapsed}
          onClose={handleClose}
        />
        <SideMenu
          collapsed={collapsed}
          activeSection={activeSection}
          onClose={handleClose}
        />
      </div>
    </ProSidebarProvider>
  );
};

export default SideBar;
