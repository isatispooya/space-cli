import { Toolbar } from "../../../components";
import { MainLayout } from "../../../layouts";
import { Outlet } from "react-router-dom";
import { FaGift } from "react-icons/fa6";
import { BiTask } from "react-icons/bi";
import { RiFileList3Line } from "react-icons/ri";

const PointsMainPage = () => {

  const toolbarButtons = [
    {
      icon: BiTask,
      text: "ماموریت ها",
      permission: ["allow_any"],
      path: "missions",
    },
    {
      icon: FaGift,
      text: "هدایا",
      permission: ["allow_any"],
      path: "gifts",
    },
    {
      icon: RiFileList3Line,
      text: "درخواست های من", 
      permission: ["allow_any"],
      path: "requests",
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
