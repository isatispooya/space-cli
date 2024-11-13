// src/components/Layout.tsx
import React, { ReactNode } from "react";
import Sidebar from "../../Modules/sidebarMenu/sidebar";
import Header from "../../Modules/headerDash/header";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div style={{ display: "flex" }}>
        <Header/>
     
      <main style={{ flexGrow: 1, padding: "16px" }}>{children}</main>
    </div>
  );
};

export default MainLayout;
