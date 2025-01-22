import { Toolbar } from "../../../components";
import { MainLayout } from "../../../layouts";
import { Outlet } from "react-router-dom";
import { FaGift } from "react-icons/fa6";
import { BiTask } from "react-icons/bi";
import { RiFileList3Line } from "react-icons/ri";
import { FaCoins } from "react-icons/fa6";

const PointsMainPage = () => {
  const toolbarButtons = [
    {
      icon: FaCoins,
      text: " امتیازات من",
      permission: ["allow_any"],
      path: "privileges",
    },

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
