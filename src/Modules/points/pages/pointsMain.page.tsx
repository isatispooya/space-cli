import { Toolbar } from "../../../components";
import { MainLayout } from "../../../layouts";
import { Outlet } from "react-router-dom";
import { FaGift } from "react-icons/fa6";
import { BiTask } from "react-icons/bi";
const PointsMainPage = () => {
  const toolbarButtons = [
    {
      icon: BiTask,
      text: "ماموریت ها",
      permission: ["view_permission"],
      path: "missions",
    },
    {
      icon: FaGift,
      text: "هدایا",
      permission: ["add_permission"],
      path: "gifts",
    },
  ];
  return (
    <>
      <MainLayout>
        <div className="min-h-screen flex flex-col">
          <div className="bg-white p-3">
            <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
              امتیازات
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
    </>
  );
};

export default PointsMainPage;
