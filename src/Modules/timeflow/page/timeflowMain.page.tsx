import { MainLayout } from "../../../layouts";
import { Outlet } from "react-router-dom";
import { Toolbar } from "../../../components";
import { LuTable } from "react-icons/lu";
import { MdOutlineSendTimeExtension } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

const TimeFlowPage = () => {
  const toolbarButtons = [
    {
      icon: LuTable,
      text: "کاربران",
      permission: ["allow_any"],
      path: "users-timeflows",
    },
    {
      icon: AiOutlineUser,
      text: "ثبت تردد",
      permission: ["allow_any"],
      path: "verify",
    },
    {
      icon: LuTable,
      text: "مرخصی",
      permission: ["allow_any"],
      path: "leave",
    },
    {
      icon: MdOutlineSendTimeExtension,
      text: "ماموریت",
      permission: ["allow_any"],
      path: "mission",
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
