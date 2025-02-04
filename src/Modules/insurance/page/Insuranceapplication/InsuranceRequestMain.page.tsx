import { Outlet } from "react-router-dom";
import { Toolbar } from "../../../../components";
import { MainLayout } from "../../../../layouts";
import { LuPlus, LuTable } from "react-icons/lu";

const InsuranceRequestMainPage = () => {
  const toolbarButtons = [
    {
      icon: LuPlus,
      text: "درخواست بیمه نامه",
      permission: ["allow_any"],
      path: "create",
    },
    {
      icon: LuTable,
      text: "درخواست های من",
      permission: ["allow_any"],
      path: "table",
    },
    {
      icon: LuTable,
      text: "بیمه های من",
      permission: ["allow_any"],
      path: "table-requests",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
            بیمه
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت و پیگیری بیمه
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

export default InsuranceRequestMainPage;
