import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FC, ReactNode, useCallback } from "react";
import { Tooltip } from "@mui/material";
import { useRefresh } from "@/components/taskbar/tools/refresh";
import { navigation } from "@/components/taskbar/tools/navigation";
import {
  exportToExcel,
  ExcelDataType,
} from "@/components/taskbar/tools/excel-export";
import {
  RefreshCw,
  ArrowLeft,
  Search,
  Filter,
  Printer,
  Settings,
  ReceiptText,
} from "lucide-react";

interface TaskBarItemType {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "exel";
  isRefreshing?: boolean;
  order?: number;
}

interface CustomToolType extends Omit<TaskBarItemType, "order"> {
  id: string;
  order?: number;
}

interface TaskBarPropsType {
  items: TaskBarItemType[];
  className?: string;
}

const Toolbar: FC<TaskBarPropsType> = ({ items, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 p-2 bg-white rounded-lg shadow-md ${className}`}
    >
      {items.map((item, index) => (
        <Tooltip key={index} title={item.label} placement="top" arrow>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.onClick}
            className={`
              flex items-center justify-center w-10 h-10 rounded-md transition-colors
              ${
                item.variant === "exel"
                  ? "bg-green-600 text-white hover:bg-green-400"
                  : ""
              }
              ${
                item.variant === "primary"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : ""
              }
              ${
                item.variant === "secondary"
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : ""
              }
              ${
                item.variant === "danger"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : ""
              }
              ${
                !item.variant
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : ""
              }
            `}
          >
            {item.isRefreshing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                {item.icon}
              </motion.div>
            ) : (
              item.icon
            )}
          </motion.button>
        </Tooltip>
      ))}
    </motion.div>
  );
};

interface TaskbarPropsType {
  onRefresh?: () => void;
  onSearch?: () => void;
  onFilter?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
  onSettings?: () => void;
  showBackButton?: boolean;
  showRefreshButton?: boolean;
  showExportButton?: boolean;
  className?: string;
  exportData?: ExcelDataType[];
  exportOptions?: {
    filename: string;
    sheetName?: string;
    dataFormatter: (item: ExcelDataType) => ExcelDataType;
  };
  customTools?: CustomToolType[];
}

export const Taskbar: FC<TaskbarPropsType> = ({
  onRefresh,
  onSearch,
  onFilter,
  onExport,
  onPrint,
  onSettings,
  showBackButton = true,
  showRefreshButton = true,
  showExportButton = true,
  className,
  exportData,
  exportOptions,
  customTools = [],
}) => {
  const navigate = useNavigate();
  const { isRefreshing, refresh } = useRefresh({
    onRefresh: onRefresh,
  });

  const handleExport = useCallback(() => {
    if (exportData && exportOptions) {
      exportToExcel(exportData, exportOptions);
    } else if (onExport) {
      onExport();
    }
  }, [exportData, exportOptions, onExport]);

  const items: TaskBarItemType[] = [];

  // Add refresh button if enabled
  if (showRefreshButton) {
    items.push({
      icon: <RefreshCw className="w-5 h-5" />,
      label: "Refresh",
      onClick: refresh,
      variant: "secondary",
      isRefreshing,
      order: 0,
    });
  }

  // Add export button if enabled
  if (showExportButton) {
    items.push({
      icon: <ReceiptText className="w-5 h-5" />,
      label: "دانلود اکسل",
      onClick: handleExport,
      variant: "exel",
      order: 1,
    });
  }

  // Add back button if enabled
  if (showBackButton) {
    items.push({
      icon: <ArrowLeft className="w-5 h-5" />,
      label: "Back",
      onClick: () => navigation.goBack(navigate),
      variant: "secondary",
      order: 2,
    });
  }

  // Add other optional buttons
  if (onSearch) {
    items.push({
      icon: <Search className="w-5 h-5" />,
      label: "Search",
      onClick: onSearch,
      variant: "secondary",
      order: 3,
    });
  }

  if (onFilter) {
    items.push({
      icon: <Filter className="w-5 h-5" />,
      label: "Filter",
      onClick: onFilter,
      variant: "secondary",
      order: 4,
    });
  }

  if (onPrint) {
    items.push({
      icon: <Printer className="w-5 h-5" />,
      label: "Print",
      onClick: onPrint,
      variant: "secondary",
      order: 5,
    });
  }

  if (onSettings) {
    items.push({
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      onClick: onSettings,
      variant: "secondary",
      order: 6,
    });
  }

  // Add custom tools
  customTools.forEach((tool) => {
    items.push({
      ...tool,
      order: tool.order ?? 7,
    });
  });

  // Sort items by order
  const sortedItems = items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return <Toolbar items={sortedItems} className={className} />;
};

export default Taskbar;
