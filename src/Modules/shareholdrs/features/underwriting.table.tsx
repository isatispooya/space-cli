import { GridColDef, DataGrid } from "@mui/x-data-grid";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import {
  CustomDataGridToolbar,
  formatNumber,
  localeText,
} from "../../../utils";
import { underwritingTypes } from "../types";
import { tableStyles } from "../../../ui";
import { useState } from "react";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useUnderwriting } from "../hooks";
import { useUserPermissions } from "../../permissions";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { useUnderwritingStore } from "../store";

const PurchacePrecendenceTable: React.FC = () => {
  const { data } = useUnderwriting.useGet();
  const navigate = useNavigate();
  const { checkPermission } = useUserPermissions();
  const { mutate: deletePurchasePrecendense } = useUnderwriting.useDelete();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<underwritingTypes | null>(
    null
  );

  const statusNames = [
    {
      value: "pending",
      label: "در انتظار",
    },
    {
      value: "approved",
      label: "تایید شده",
    },
    {
      value: "rejected",
      label: "رد شده",
    },
  ];
  const columns: GridColDef[] = [
    {
      field: "type",
      headerName: "نوع",
      width: 100,
      renderCell: (params) => {
        return params.row.type === "2" ? "درگاه پرداخت" : "فیش بانکی";
      },
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 100,
      renderCell: (params) => formatNumber(params.row.price),
    },
    {
      field: "company",
      headerName: "شرکت",
      width: 100,
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 100,
      renderCell: (params) => {
        const statusObj = statusNames.find(
          (status) => status.value === params.row.status
        );
        return statusObj ? statusObj.label : params.row.status;
      },
    },
    {
      field: "requested_amount",
      headerName: "مقدار درخواستی",
      width: 150,
    },
    {
      field: "user",
      headerName: "کاربر",
    },
    {
      field: "document",
      headerName: "سند",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <a href={params.value} target="_blank" rel="noopener noreferrer">
            مشاهده سند
          </a>
        ) : (
          <span>ناموجود</span>
        ),
    },
    {
      field: "updated_at",
      headerName: "تاریخ بروزرسانی",
      width: 150,
      renderCell: (params) => {
        return moment(params.row.updated_at)
          .locale("fa")
          .format("jYYYY/jMM/jDD");
      },
    },
  ];

  const rows = data || [];

  console.log(data);

  return (
    <>
      <div className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden">
        <DataGrid columns={columns} rows={rows} />
      </div>
    </>
  );
};
export default PurchacePrecendenceTable;
