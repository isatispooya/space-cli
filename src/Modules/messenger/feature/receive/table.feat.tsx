import "moment/locale/fa";
import { TabulatorTable } from "../../../../components";
import { useMemo } from "react";
import columns from "../../data/receive/columnsData";
import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import {
  CorrespondenceItem,
  ReceiveMessage,
} from "../../types/receive/ReceiveMessage.type";
import ExelData from "../../data/receive/receiveExelData";
import { RowComponent } from "tabulator-tables";

export const ReceiveTable = () => {
  const { data: correspondence } =
    useCorrespondenceAttachment.useGetCorrespondence();
  const mappedData = useMemo(() => {
    if (!correspondence?.receiver) return [];

    return correspondence.receiver.map((item: CorrespondenceItem) => {
      const date = new Date(item.created_at);
      const year = new Intl.DateTimeFormat('fa', { year: 'numeric' }).format(date);
      const month = new Intl.DateTimeFormat('fa', { month: '2-digit' }).format(date);
      const day = new Intl.DateTimeFormat('fa', { day: '2-digit' }).format(date);
      const formattedDate = `${year}/${month}/${day}`;

      return {
        id: item.id,
        title: item.subject,
        number: item.number,
        sender:
          item.sender_details?.user?.first_name +
            " " +
            item.sender_details?.user?.last_name +
            " " +
            "-" +
            item.sender_details?.name || "نامشخص" + ")",
        receiver:
          item.is_internal !== false
            ? item.receiver_internal_details?.user?.first_name +
                " " +
                item.receiver_internal_details?.user?.last_name +
                " " +
                "-" +
                item.receiver_internal_details?.name || "نامشخص"
            : item.receiver_external || "نامشخص",
        send_date: formattedDate,
        kind_of_correspondence:
          item.priority === "urgent" ? "اعلامیه" : "درخواست",
        status: "",
        seen: item.seen || false,
      };
    });
  }, [correspondence]);

  const tableOptions = useMemo(() => {
    return {
      rowFormatter: (row: RowComponent) => {
        const data = row.getData();
        if (data && data.seen === false) {
          row.getElement().style.backgroundColor = "#f5f5f5";
        }
      }
    };
  }, []);

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData}
          columns={columns()}
          title="پیام های دریافتی"
          showActions={true}
          formatExportData={(item: ReceiveMessage) => ExelData(item)}
          dateField="send_date"
          showDateFilter={true}
          options={tableOptions}
        />
      </div>
    </div>
  );
};
export default ReceiveTable;
