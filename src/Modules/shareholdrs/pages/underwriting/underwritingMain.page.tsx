import { Outlet } from "react-router-dom";
import { MainLayout } from "../../../../layouts";
import { Toolbar } from "../../../../components";
import { LuInfo } from "react-icons/lu";
import { LuTable } from "react-icons/lu";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa6";
import { RiProgress5Fill } from "react-icons/ri";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import { GrUserExpert } from "react-icons/gr";
import { IoDocumentAttachSharp } from "react-icons/io5";

const UnderwritingMain = () => {
  const toolbarButtons = [

    {
      icon: LuInfo,
      text: "آگهی پذیره نویسی",
      permission: "unused_precedence_process",
      path: "description",
    },
    {
      icon: FaBusinessTime,
      text: "طرح کسب و کار",
      permission: "unused_precedence_process",
      path: "businessPlan",
    },
    {
      text: "پیشرفت پروژه",
      icon: RiProgress5Fill,
      permission: "unused_precedence_process",
      path: "projectProgress",
    },
    {
      text: "صورت مالی",
      icon: FaMoneyCheckAlt,
      permission: "unused_precedence_process",
      path: "financialStatement",
    },
    {
      text: "اعتبار سنجی بانکی",
      icon: GrValidate,
      permission: "unused_precedence_process",
      path: "creditAnalysis",
    },
    {
      text: "اعتبارسنجی پروژه",
      icon: FaBusinessTime,
      permission: "unused_precedence_process",
      path: "projectAnalysis",
    },
    {
      text: "کارشناسی سهام",
      icon: GrUserExpert,
      permission: "unused_precedence_process",
      path: "shareExpert",
    },
    {
      icon: IoDocumentAttachSharp,
      text: "سایر اطلاعات",
      permission: "unused_precedence_process",
      path: "attachments",
    },
    {
      icon: LuTable,
      text: "سرمایه گذاری های من",
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
          <div className="px-6 ">
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
