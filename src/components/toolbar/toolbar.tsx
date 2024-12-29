import { IconType } from "react-icons";
import { useUserPermissions } from "../../Modules/permissions";
import { useNavigate } from "react-router-dom";

interface ToolbarButton {
  icon: IconType;
  text: string;
  permission: string;
  path: string;
}

interface ToolbarProps {
  buttons?: ToolbarButton[];
  variant?: "default" | "tabs";
}

const Toolbar = ({ buttons }: ToolbarProps) => {
  const { checkPermission } = useUserPermissions();
  const navigate = useNavigate();
  const basePath = window.location.pathname.split("/")[1];
  const currentPath = window.location.pathname.split("/")[2];

  return (
    <div className="w-full">
      <div className="relative right-0">
        <ul
          className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100"
          data-tabs="tabs"
          role="list"
        >
          {buttons?.map(
            (button, index) =>
              checkPermission(button.permission) && (
                <li key={index} className=" flex-auto text-center">
                  <a
                    onClick={() => {
                      navigate(`/${basePath}/${button.path}`);
                    }}
                    className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${
                      currentPath === button.path
                        ? "bg-slate-300 text-slate-900 font-medium"
                        : "text-slate-600 bg-inherit hover:bg-slate-200"
                    }`}
                    role="tab"
                    aria-selected={currentPath === button.path}
                  >
                    <button.icon
                      className={`w-4 h-4 space-x-4 mr-1.5 ${
                        currentPath === button.path
                          ? "text-slate-900"
                          : "text-slate-500"
                      }`}
                    />
                    <span className="ml-1">{button.text}</span>
                  </a>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Toolbar;
