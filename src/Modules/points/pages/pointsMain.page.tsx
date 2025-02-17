import { Toolbar } from "../../../components";
import { MainLayout } from "../../../layouts";
import { Outlet } from "react-router-dom";
import { toolbarButtons } from "../components/toolbarButton";

const PointsMainPage = () => {
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
