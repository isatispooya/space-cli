import { Outlet } from "react-router-dom";
import { MainLayout } from "../../../layouts";
import { Toolbar } from "../../../components";
import { LuPlusSquare } from "react-icons/lu";
import { LuTable } from "react-icons/lu";

const PurchacePrecendenceMain = () => {
    const toolbarButtons = [
        {
          icon: LuTable,
          text: "جدول",
          permission: "view_shareholders",
          path: "table"
        },
        {
          icon: LuPlusSquare,
          text: "ایجاد",
          permission: "add_shareholders",
          path: "create"
        } 
      ];

      return (
        <MainLayout>
        <div className="min-h-screen flex flex-col">
          <div className="bg-white p-3">
            <h1 className="text-2xl font-bold text-center text-indigo-600 mb-1">
              خرید حق تقدم استفاده نشده
            </h1>
            <p className="text-gray-600 text-center text-sm">
              مدیریت و پیگیری خرید حق تقدم استفاده نشده
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
}
 
export default PurchacePrecendenceMain;