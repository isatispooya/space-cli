import "moment/locale/fa";
import { TabulatorTable } from "../../../../components";
import { useMemo, useState, useCallback } from "react";
import columns from "../../data/receive/columnsData";
import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import { chatService } from "../../services";
import {
  CorrespondenceItemType,
  ReceiveMessageType,
} from "../../types/receive/ReceiveMessage.type";
import { CorrespondenceResponseType } from "../../types/sent/sent.type";
import ExelData from "../../data/receive/receiveExelData";
import { RowComponent } from "tabulator-tables";

export const ReceiveTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] =
    useState<CorrespondenceResponseType>({ sender: [], receiver: [] });
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

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
    if (
      hasSearched &&
      searchResults.receiver &&
      searchResults.receiver.length > 0
    ) {
      return searchResults.receiver.map((item: CorrespondenceItemType) => {
        const date = new Date(item.created_at);
        const year = new Intl.DateTimeFormat("fa", { year: "numeric" }).format(
          date
        );
        const month = new Intl.DateTimeFormat("fa", {
          month: "2-digit",
        }).format(date);
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
          seen: item.seen || false,
          confidentiality_level:
            item.confidentiality_level === "confidential"
              ? "محرمانه"
              : item.confidentiality_level === "secret"
              ? "سری"
              : item.confidentiality_level === "top_secret"
              ? "فوق سری"
              : "عادی",
        };
      });
    }

    if (
      hasSearched &&
      searchResults.sender &&
      searchResults.sender.length > 0 &&
      (!searchResults.receiver || searchResults.receiver.length === 0)
    ) {
      return searchResults.sender.map((item: CorrespondenceItemType) => {
        const date = new Date(item.created_at);
        const year = new Intl.DateTimeFormat("fa", { year: "numeric" }).format(
          date
        );
        const month = new Intl.DateTimeFormat("fa", {
          month: "2-digit",
        }).format(date);
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
          seen: item.seen || false,
          confidentiality_level:
            item.confidentiality_level === "confidential"
              ? "محرمانه"
              : item.confidentiality_level === "secret"
              ? "سری"
              : item.confidentiality_level === "top_secret"
              ? "فوق سری"
              : "عادی",
        };
      });
    }

    if (!correspondence?.receiver) return [];

    return correspondence.receiver.map((item: CorrespondenceItemType) => {
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
        seen: item.seen || false,
        confidentiality_level:
          item.confidentiality_level === "confidential"
            ? "محرمانه"
            : item.confidentiality_level === "secret"
            ? "سری"
            : item.confidentiality_level === "top_secret"
            ? "فوق سری"
            : "عادی",
      };
    });
  }, [correspondence, searchResults, hasSearched]);

  const tableOptions = useMemo(() => {
    return {
      rowFormatter: (row: RowComponent) => {
        const data = row.getData();
        if (data && data.seen === false) {
          row.getElement().style.backgroundColor = "#f5f5f5";
        }
      },
    };
  }, []);

  const searchFields = useMemo(
    () => [
      "title",
      "number",
      "sender",
      "receiver",
      "kind_of_correspondence",
      "confidentiality_level",
    ],
    []
  );

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در متن نامه..."
            className="border border-gray-300 rounded-r-lg px-4 py-2 focus:outline-none"
          />
          <button
            onClick={() => handleSearch(searchTerm)}
            className="bg-blue-500 text-white px-4 py-2 rounded-l-lg"
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

      {hasSearched &&
        !isSearching &&
        (!searchResults.receiver || searchResults.receiver.length === 0) &&
        (!searchResults.sender || searchResults.sender.length === 0) && (
          <div className="w-full text-center py-4 text-gray-500">
            نتیجه‌ای یافت نشد
          </div>
        )}

      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData}
          columns={columns()}
          title="پیام های دریافتی"
          showActions={true}
          formatExportData={(item: ReceiveMessageType) => ExelData(item)}
          dateField="send_date"
          showDateFilter={hasSearched ? false : true}
          showSearchFilter={false}
          searchFields={searchFields}
          options={tableOptions}
        />
      </div>
    </div>
  );
};
export default ReceiveTable;
