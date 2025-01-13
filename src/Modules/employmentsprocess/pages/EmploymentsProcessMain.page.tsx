import { Outlet } from "react-router-dom";
import { MainLayout } from "../../../layouts";
import { Toolbar } from "../../../components";
import { LuPlus, LuTable } from "react-icons/lu";

const EmploymentsProcessMainPage = () => {
  const toolbarButtons = [
    {
      icon: LuTable,
      text: "لیست فرایند ها",
      permission: ["allow_any"],
      path: "table",
    },
    {
      icon: LuPlus,
      text: "ثبت فرایند استخدامی",
      permission: ["allow_any"],
      path: "create",
    },
  ];
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            فرایند های استخدامی
          </h1>
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

export default EmploymentsProcessMainPage;
