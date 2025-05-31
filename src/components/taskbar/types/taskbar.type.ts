/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";

type ButtonVariantType = "excel" | "refresh" | "nav";

interface SearchInputPropsType {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceTime?: number;
  initialValue?: string;
}

interface ExcelDataType {
  [key: string]: string | number | boolean;
}

interface ExcelExportOptionsType {
  filename: string;
  sheetName?: string;
  dataFormatter: (item: any) => ExcelDataType;
}

interface NavigationOptionsType {
  navigate: NavigateFunction;
  path?: string;
  params?: Record<string, string | number>;
  state?: Record<string, unknown>;
  replace?: boolean;
}

interface RefreshOptionsType {
  onRefresh?: () => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

interface UseRefreshReturnType {
  isRefreshing: boolean;
  refresh: () => Promise<void>;
  setRefreshing: (value: boolean) => void;
}

interface TaskBarItemType {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  variant?: ButtonVariantType;
  isRefreshing?: boolean;
  order?: number;
}

interface CustomToolType extends Omit<TaskBarItemType, "order"> {
  id: string;
  order?: number;
}

interface TaskbarPropsType {
  onRefresh?: () => void;
  onExport?: () => void;
  onSearch?: (value: string) => void;
  items: TaskBarItemType[];
  custom?: ReactNode;
  showBackButton?: boolean;
  className?: string;
  exportData?: ExcelDataType[];
  exportOptions?: {
    filename: string;
    sheetName?: string;
    dataFormatter: (item: ExcelDataType) => ExcelDataType;
  };
  customTools?: CustomToolType[];
  searchProps?: Omit<SearchInputPropsType, "onSearch">;
}
interface SearchInputPropsType {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceTime?: number;
  initialValue?: string;
}

type TaskBarType = {
  taskBarProps: TaskbarPropsType;
  searchProps: SearchInputPropsType;
  exportProps: ExcelExportOptionsType;
  navigationProps: NavigationOptionsType;
  refreshProps: RefreshOptionsType;
  customTools: CustomToolType[];
  items: TaskBarItemType[];
  refreshReturn: UseRefreshReturnType;
  buttonVariantType: ButtonVariantType;
  exportData: ExcelDataType[];
};

export default TaskBarType;
