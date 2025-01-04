// src/components/Layout.tsx
import { ReactNode } from "react";

import { Header } from "../components/header";
import { SideBar } from "../Modules/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
