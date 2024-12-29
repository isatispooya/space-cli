import { IconType } from "react-icons";
import { useUserPermissions } from "../../Modules/permissions";

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

const Toolbar = ({ buttons, variant = "default" }: ToolbarProps) => {
  const { checkPermission } = useUserPermissions();
  const basePath = window.location.pathname.split("/")[1];

  if (variant === "tabs") {
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
                  <li key={index} className="z-30 flex-auto text-center">
                    <a
                      onClick={() => {
                        window.location.href = `/${basePath}/${button.path}`;
                      }}
                      className="z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-600 bg-inherit hover:bg-slate-200"
                      role="tab"
                    >
                      <button.icon className="w-4 h-4 mr-1.5 text-slate-500" />
                      <span className="ml-1">{button.text}</span>
                    </a>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        {buttons?.map(
          (button, index) =>
            checkPermission(button.permission) && (
              <button
                key={index}
                onClick={() => {
                  window.location.href = `/${basePath}/${button.path}`;
                }}
                className="flex items-center px-3 py-1.5 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 space-x-2 space-x-reverse"
              >
                <button.icon className="w-4 h-4" />
                <span className="text-sm">{button.text}</span>
              </button>
            )
        )}
      </div>
    </div>
  );
};

export default Toolbar;
