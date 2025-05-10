// src/components/Layout.tsx
import { ReactNode } from "react";
import { Header } from "../components/layouts/header";
import { SideBar } from "../Modules/sidebar";

interface LayoutPropsType {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutPropsType) => {
  return (
    <>
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
