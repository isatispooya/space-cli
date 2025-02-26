import { MainLayout } from "../../../layouts";
import { Outlet } from "react-router-dom";
import { Toolbar } from "../../../components";
import { LuTable } from "react-icons/lu";

const TimeFlowPage = () => {
  const toolbarButtons = [
    {
      icon: LuTable,
      text: "ایجاد شیفت",
      permission: ["allow_any"],
      path: "form",
    },
    {
      icon: LuTable,
      text: "شیفت ها",
      permission: ["allow_any"],
      path: "table",
    },
    {
      icon: LuTable,
      text: "تخصیص شیفت ها",
      permission: ["allow_any"],
      path: "assign",
    },
  ];
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            پنل مدیریت شیفت ها
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت و پیگیری ورود و خروج شیفت ها
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
