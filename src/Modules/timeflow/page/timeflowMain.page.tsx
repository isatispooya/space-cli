import { MainLayout } from "@/layouts";
import { Outlet } from "react-router-dom";
import { Toolbar } from "@/components";
import { LuTable } from "react-icons/lu";
import { VscGitStashApply } from "react-icons/vsc";

const TimeFlowPage = () => {
  const toolbarButtons = [
    {
      icon: VscGitStashApply,
      text: "ثبت تردد",
      permission: ["allow_any"],
      path: "verify",
    },
    {
      icon: LuTable,
      text: "جزئیات تردد",
      permission: ["allow_any"],
      path: "users-timeflows",
    },
    {
      icon: LuTable,
      text: "لیست تردد",
      permission: ["allow_any"],
      path: "details-table",
    },
    {
      icon: LuTable,
      text: "تردد های زیر مجموعه",
      permission: ["parent_user"],
      path: "list",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            پنل ورود و خروج کاربران
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت و پیگیری ورود و خروج کاربران
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
