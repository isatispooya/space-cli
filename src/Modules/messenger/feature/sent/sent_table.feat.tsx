import "moment/locale/fa";
import { TabulatorTable } from "../../../../components";
import { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import { chatService } from "../../services";
import { CorrespondenceItemType, SentMessageType, CorrespondenceResponseType } from "../../types/sent/sent.type";
import columns from "../../data/sent/coulmnData";
import ExelData from "../../data/sent/sentExelData";

export const SentTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CorrespondenceResponseType>({ sender: [], receiver: [] });
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  const handleView = (row: SentMessageType) => {
    navigate(`/letter/message/${row.id}`);
  };
  const handleEdit = (id: number) => {
    navigate(`/letter/update-form/${id}`);
  };

  const { data: correspondence } =
    useCorrespondenceAttachment.useGetCorrespondence();
  
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults({ sender: [], receiver: [] });
      setHasSearched(false);
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await chatService.search(query);
      setSearchResults(response as unknown as CorrespondenceResponseType);
      setHasSearched(true);
    } catch (error) {
      console.error("خطا در جستجو:", error);
      setSearchResults({ sender: [], receiver: [] });
    } finally {
      setIsSearching(false);
    }
  }, []);
  
  const mappedData = useMemo(() => {
    if (hasSearched && searchResults.sender && searchResults.sender.length > 0) {
      return searchResults.sender.map((item: CorrespondenceItemType) => {
        let formattedDate = "نامشخص";
        try {
          if (item.created_at) {
            const date = new Date(item.created_at);
            if (!isNaN(date.getTime())) {
              const year = new Intl.DateTimeFormat("fa", { year: "numeric" }).format(date);
              const month = new Intl.DateTimeFormat("fa", { month: "2-digit" }).format(date);
              const day = new Intl.DateTimeFormat("fa", { day: "2-digit" }).format(date);
              formattedDate = `${year}/${month}/${day}`;
            }
          }
        } catch (error) {
          console.error("خطا در تبدیل تاریخ:", error);
        }

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
              item.sender_details?.name || "نامشخص",
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
    }
    
    if (!correspondence?.sender) return [];

    return correspondence.sender.map((item: CorrespondenceItemType) => {
      let formattedDate = "نامشخص";
      try {
        if (item.created_at) {
          const date = new Date(item.created_at);
          if (!isNaN(date.getTime())) {
            const year = new Intl.DateTimeFormat("fa", { year: "numeric" }).format(date);
            const month = new Intl.DateTimeFormat("fa", { month: "2-digit" }).format(date);
            const day = new Intl.DateTimeFormat("fa", { day: "2-digit" }).format(date);
            formattedDate = `${year}/${month}/${day}`;
          }
        }
      } catch (error) {
        console.error("خطا در تبدیل تاریخ:", error);
      }

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
            item.sender_details?.name || "نامشخص",
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
  }, [correspondence, searchResults, hasSearched]);

  const searchFields = useMemo(() => [
    "title",
    "number",
    "sender",
    "receiver",
    "kind_of_correspondence",
    "confidentiality_level"
  ], []);

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در نامه‌ها..."
            className="border border-gray-300 rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={() => handleSearch(searchTerm)}
            className="bg-blue-500 text-white px-4 py-2 rounded-l-lg hover:bg-blue-600"
          >
            جستجو
          </button>
        </div>
      </div>
      
      {isSearching && (
        <div className="w-full text-center py-4 text-gray-500">
          در حال جستجو...
        </div>
      )}
      
      {hasSearched && !isSearching && searchResults.sender && searchResults.sender.length === 0 && (
        <div className="w-full text-center py-4 text-gray-500">
          نتیجه‌ای یافت نشد
        </div>
      )}
      
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData}
          columns={columns({ handleEdit, handleView })}
          title="پیام های ارسالی"
          showActions={true}
          formatExportData={ExelData}
          dateField="send_date"
          showDateFilter={hasSearched ? false : true}
          showSearchFilter={false}
          searchFields={searchFields}
        />
      </div>
    </div>
  );
};
export default SentTable;
