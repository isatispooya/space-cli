import { FC, useCallback } from "react";
import { useRefresh, exportToExcel, SearchInput } from "./tools";
import { RefreshCw, ReceiptText } from "lucide-react";
import TaskBarType from "./types/taskbar.type";
import { Toolbarr } from "./components";

export const Taskbar: FC<TaskBarType["taskBarProps"]> = ({
  onRefresh,
  onExport,
  onSearch,
  className,
  exportData,
  exportOptions,
  customTools = [],
  searchProps,
}) => {
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

  const items: TaskBarType["items"] = [
    {
      icon: <RefreshCw className="w-5 h-5" />,
      label: "به روز رسانی",
      onClick: refresh,
      variant: "refresh" as TaskBarType["buttonVariantType"],
      isRefreshing,
      order: 0,
    },
    {
      icon: <ReceiptText className="w-5 h-5" />,
      label: "دانلود اکسل",
      onClick: handleExport,
      variant: "excel" as TaskBarType["buttonVariantType"],
      order: 1,
    },

    ...customTools.map((tool) => ({
      ...tool,
      order: tool.order ?? 5,
    })),
  ];

  const sortedItems = items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="">
      <Toolbarr items={sortedItems} className={className} />
      {onSearch && <SearchInput onSearch={onSearch} {...searchProps} />}
    </div>
  );
};

export default Taskbar;
