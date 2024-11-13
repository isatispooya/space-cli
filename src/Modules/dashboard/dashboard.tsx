import React from "react";
import Header from "../headerDash/header";
import Sidebar from "../sidebarMenu/sidebar";

const Dashboard = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Header />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Dashboard;
