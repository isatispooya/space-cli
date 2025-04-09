// src/components/Layout.tsx
import { ReactNode, useState } from "react";
import { Header } from "../components/layouts/header";
import { SideBar } from "../Modules/sidebar";
import TimeflowVerify from "../Modules/timeflow/components/verify";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  const [isVerifyOpen, setIsVerifyOpen] = useState(true);

  return (
    <>
      {isVerifyOpen && <TimeflowVerify onClose={() => setIsVerifyOpen(true)} />}
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
