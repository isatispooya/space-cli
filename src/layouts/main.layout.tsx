// src/components/Layout.tsx
import { ReactNode } from "react";
import { Header } from "../components/layouts/header";
import { SideBar } from "../Modules/sidebar";
import { VerifyReminder } from "@/Modules/timeflow/components";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <VerifyReminder />
      <div>
        <SideBar />
        <div>
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
