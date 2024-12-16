import React, { useState, useEffect } from "react";
import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css";
import { usePermissionList } from "../Modules/permissions/hooks";

export default function MovableRowsTabulator() {
  const { data, isLoading } = usePermissionList();

  const columns = [
    { title: "ID", field: "id", width: 70 },
    { title: "Name", field: "name", width: 200 },
    { title: "Codename", field: "codename", width: 150 },
  ];

  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);

  useEffect(() => {
    if (data) {
      setTable1Data(data);
    }
  }, [data]);

  const commonOptions = {
    height: "400px",
    layout: "fitColumns",
    movableRows: true,
    movableRowsConnectedTables: ".custom-tabulator",
    groupBy: false,
    movableColumns: false,
  };

  const moveRow = (fromTable: string, toTable: string, rowData: any) => {
    if (fromTable === "table1") {
      setTable1Data((prev) => prev.filter((item) => item.id !== rowData.id));
      setTable2Data((prev) => [...prev, rowData]);
    } else {
      setTable2Data((prev) => prev.filter((item) => item.id !== rowData.id));
      setTable1Data((prev) => [...prev, rowData]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {isLoading ? (
        <div>Loading permissions...</div>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <h3>Available Permissions</h3>
            <ReactTabulator
              id="table1"
              className="custom-tabulator"
              data={table1Data}
              columns={columns}
              options={{
                ...commonOptions,
                movableRowsSender: "delete",
                movableRowsReceiver: "add",
                rowMoved: (row: any) => {
                  const data = row.getData();
                  moveRow("table1", "table2", data);
                },
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <h3>Assigned Permissions</h3>
            <ReactTabulator
              id="table2"
              className="custom-tabulator"
              data={table2Data}
              columns={columns}
              options={{
                ...commonOptions,
                movableRowsSender: "delete",
                movableRowsReceiver: "add",
                rowMoved: (row: any) => {
                  const data = row.getData();
                  moveRow("table2", "table1", data);
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
