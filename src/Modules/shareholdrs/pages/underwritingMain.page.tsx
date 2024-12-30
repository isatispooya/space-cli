import { Outlet } from "react-router-dom";
import { MainLayout } from "../../../layouts";
import { Toolbar } from "../../../components";
import { LuInfo, LuSquare } from "react-icons/lu";
import { LuTable } from "react-icons/lu";
import { MdOutlineShoppingBag } from "react-icons/md";

const UnderwritingMain = () => {
  const toolbarButtons = [
    {
      icon: LuInfo,
      text: "توضیحات",
      permission: "unused_precedence_process",
      path: "description",
    },
    {
      icon: LuSquare,
      text: "ضمایم",
      permission: "unused_precedence_process",
      path: "attachments",
    },
    {
      icon: LuTable,
      text: "جدول",
      permission: "unused_precedence_process",
      path: "table",
    },
    {
      icon: MdOutlineShoppingBag,
      text: "سرمایه گذاری ",
      permission: "unused_precedence_process",
      path: "create",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col">
        <div className="bg-white p-3">
          <h1 className="text-2xl font-bold text-center text-[#5677BC] mb-1">
            پذیره نویسی
          </h1>
          <p className="text-gray-600 text-center text-sm">
            مدیریت و پیگیری پذیره نویسی
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

export default UnderwritingMain;
