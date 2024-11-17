// src/components/Layout.tsx
import  { ReactNode } from "react";
import Header from "../../Modules/headerDash/header";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div style={{ display: "flex" }}>
        <Header/>
     
      <main style={{ flexGrow: 1, padding: "16px" }}>{children}</main>
    </div>
  );
};

export default MainLayout;
