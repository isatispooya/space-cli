import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarExport,
} from "@mui/x-data-grid";

interface Action {
  label: string;
  show: boolean;
  onClick: () => void;
  icon: React.ReactElement;
  className?: string;
}

interface CustomDataGridToolbarProps {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: unknown[];
  };
  fileName: string;
  showExcelExport?: boolean;
  actions: {
    edit?: Action;
    view?: Action;
    delete?: Action;
    import?: Action;
  };
}

const CustomDataGridToolbar = ({
  showExcelExport,
  actions,
}: CustomDataGridToolbarProps) => {
  return (
    <GridToolbarContainer className="flex justify-between p-2">
      <div className="flex gap-2">
        {actions.view?.show && (
          <button
            onClick={actions.view.onClick}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
              actions.view.className || "text-blue-600 hover:bg-blue-50"
            }`}
          >
            {actions.view.icon}
            {actions.view.label}
          </button>
        )}
        {actions.edit?.show && (
          <button
            onClick={actions.edit.onClick}
            className="flex items-center gap-1 px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg"
          >
            {actions.edit.icon}
            {actions.edit.label}
          </button>
        )}
        {actions.delete?.show && (
          <button
            onClick={actions.delete.onClick}
            className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg"
          >
            {actions.delete.icon}
            {actions.delete.label}
          </button>
        )}
        {actions.import?.show && (
          <button
            onClick={actions.import.onClick}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
              actions.import.className || "text-purple-600 hover:bg-purple-50"
            }`}
          >
            {actions.import.icon}
            {actions.import.label}
          </button>
        )}
      </div>
      <div className="flex gap-2">
        <GridToolbarQuickFilter />
        {showExcelExport && <GridToolbarExport />}
      </div>
    </GridToolbarContainer>
  );
};

export default CustomDataGridToolbar;
