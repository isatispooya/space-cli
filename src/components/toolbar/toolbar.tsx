import { IconType } from "react-icons";
import { useUserPermissions } from "../../Modules/permissions";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ToolbarButton {
  icon: IconType;
  text: string;
  permission: string;
  path: string;
  onClick?: () => void;
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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-4"
    >
      <div className="relative right-0">
        <ul
          className="relative flex flex-wrap gap-2 p-2 list-none rounded-xl bg-white/10 backdrop-blur-sm shadow-lg border border-slate-200/20"
          data-tabs="tabs"
          role="list"
        >
          {buttons?.map(
            (button, index) =>
              checkPermission(button.permission) && (
                <motion.li
                  key={index}
                  className="flex-auto text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a
                    onClick={() => navigate(`/${basePath}/${button.path}`)}
                    className={`z-30 flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 ease-in-out
                      ${
                        currentPath === button.path
                          ? "bg-[#5677BC] text-white shadow-lg shadow-[#5677BC]/20 scale-105"
                          : "text-slate-600 hover:bg-slate-100 hover:text-[#5677BC]"
                      }`}
                    role="tab"
                    aria-selected={currentPath === button.path}
                    whileHover={{
                      scale: currentPath !== button.path ? 1.02 : 1,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="flex items-center gap-4"
                      initial={false}
                      animate={{
                        color:
                          currentPath === button.path ? "#ffffff" : "#475569",
                      }}
                    >
                      <button.icon className="w-5 h-5" />
                      <span>{button.text}</span>
                    </motion.div>
                  </motion.a>
                </motion.li>
              )
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default Toolbar;
