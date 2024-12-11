import { DataGrid } from "@mui/x-data-grid";


const ShareholdTable = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 100 },
  ];
  return <DataGrid columns={columns} rows={[]} />;
};

export default ShareholdTable;
