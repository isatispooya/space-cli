import "moment/locale/fa";
import { TabulatorTable } from "../../../../components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import { CorrespondenceItemType, SentMessageType } from "../../types/sent/sent.type";
import columns from "../../data/sent/coulmnData";
import ExelData from "../../data/sent/sentExelData";
export const SentTable = () => {
  const navigate = useNavigate();
  const handleView = (row: SentMessageType) => {
    navigate(`/letter/message/${row.id}`);
  };
  const handleEdit = (id: number) => {
    navigate(`/letter/update-form/${id}`);
  };

  const { data: correspondence } =
    useCorrespondenceAttachment.useGetCorrespondence();
  const mappedData = useMemo(() => {
    if (!correspondence?.sender) return [];

    console.log(correspondence.sender);

    return correspondence.sender.map((item: CorrespondenceItemType) => {
      const date = new Date(item.created_at);
      const year = new Intl.DateTimeFormat("fa", { year: "numeric" }).format(
        date
      );
      const month = new Intl.DateTimeFormat("fa", { month: "2-digit" }).format(
        date
      );
      const day = new Intl.DateTimeFormat("fa", { day: "2-digit" }).format(
        date
      );
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
        confidentiality_level: item.confidentiality_level === "confidential" ? "محرمانه" : item.confidentiality_level === "secret" ? "سری" : item.confidentiality_level === "top_secret" ? "فوق سری" : "عادی",
      };
    });
  }, [correspondence]);

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData}
          columns={columns({ handleEdit, handleView })}
          title="پیام های ارسالی"
          showActions={true}
          formatExportData={ExelData}
          dateField="send_date"
          showDateFilter={true}
        />
      </div>
    </div>
  );
};
export default SentTable;
