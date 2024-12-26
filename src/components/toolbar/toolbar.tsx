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
}

const Toolbar = ({ buttons }: ToolbarProps) => {
  const { checkPermission } = useUserPermissions();
  const basePath = window.location.pathname.split("/")[1];


  

  return (
    <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        {buttons?.map((button, index) => 
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
