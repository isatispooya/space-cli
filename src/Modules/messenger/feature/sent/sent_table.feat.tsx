import "moment/locale/fa";
import { TabulatorTable } from "../../../../components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import { CorrespondenceItem, SentMessage } from "../../types/sent/sent.type";
import columns from "../../data/sent/coulmnData";
import ExelData from "../../data/sent/sentExelData";
export const SentTable = () => {
  const navigate = useNavigate();
  const handleView = (row: SentMessage) => {
    navigate(`/letter-sent/message/${row.id}`);
  };
  const handleEdit = (id: number) => {
    navigate(`/letter-sent/update-form/${id}`);
  };

  const { data: correspondence } =
    useCorrespondenceAttachment.useGetCorrespondence();
  const mappedData = useMemo(() => {
    if (!correspondence?.sender) return [];

    return correspondence.sender.map((item: CorrespondenceItem) => ({
      id: item.id,
      title: item.subject,
      sender:
        item.sender_details?.user?.first_name +
          " " +
          item.sender_details?.user?.last_name || "نامشخص",
      receiver:
        item.is_internal !== false
          ? item.receiver_internal_details?.user?.first_name +
              " " +
              item.receiver_internal_details?.user?.last_name || "نامشخص"
          : item.receiver_external || "نامشخص",
      send_date: new Date(item.created_at).toLocaleDateString("fa-IR"),
      message_type: item.priority === "urgent" ? "فوری" : "عادی",
    }));
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
        />
      </div>
    </div>
  );
};
export default SentTable;
