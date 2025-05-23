import { MainLayout } from "../../../layouts";
import { Outlet } from "react-router-dom";
import { Toolbar } from "../../../components";
import { FaUserTie } from "react-icons/fa";

const TimeFlowPage = () => {
  const toolbarButtons = [
    {
      icon: FaUserTie,
      text: "درخواست مشاوره",
      permission: ["allow_any"],
      path: "request",
    },
    {
      icon: FaUserTie,
      text: "سوابق درخواست",
      permission: ["allow_any"],
      path: "requests",
    },
  ];
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            پنل مشاوره
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت و پیگیری درخواست های مشاوره
          </p>
        </div>
        <div className="flex-grow flex flex-col">
          <div className="px-6 py-3">
            <Toolbar buttons={toolbarButtons} />
          </div>
          <div className="flex-grow px-6 bg-white">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TimeFlowPage;
