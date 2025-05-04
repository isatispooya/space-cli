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

export const ReceiveTable = () => {
  const { data: correspondence } =
    useCorrespondenceAttachment.useGetCorrespondence();
  const mappedData = useMemo(() => {
    if (!correspondence?.receiver) return [];

    return correspondence.receiver.map((item: CorrespondenceItem) => ({
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
      send_date: new Date(item.created_at).toLocaleDateString("fa-IR"),
      message_type: item.priority === "urgent" ? "فوری" : "عادی",
      status: "",
    }));
  }, [correspondence]);

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData}
          columns={columns()}
          title="پیام های ارسالی"
          showActions={true}
          formatExportData={(item: ReceiveMessage) => ExelData(item)}
        />
      </div>
    </div>
  );
};
export default ReceiveTable;
