import { Outlet } from "react-router-dom";
import { MainLayout } from "../../../layouts";
import { Toolbar } from "../../../components";
import { LuTable } from "react-icons/lu";
import { LuPlusSquare } from "react-icons/lu";

const PrecendenceMainPage = () => {
  const toolbarButtons = [
    {
      icon: LuTable,
      text: "جدول",
      permission: "viwe_precedence",
      path: "table"
    },
    {
      icon: LuPlusSquare,
      text: "ایجاد",
      permission: "add_precedence",
      path: "create"
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            سامانه مدیریت حق تقدم
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت و پیگیری حق تقدم به صورت هوشمند
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

export default PrecendenceMainPage;
