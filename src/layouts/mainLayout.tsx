// src/components/Layout.tsx
import  { ReactNode } from "react";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {

  return (
    <div>
        <Header/>
        <Sidebar/>
      <main style={{ flexGrow: 1, padding: "16px" }}>{children}</main>
    </div>
  );
};

export default MainLayout;
