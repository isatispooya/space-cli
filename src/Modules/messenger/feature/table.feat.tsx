import "moment/locale/fa";
import { LoaderLg, TabulatorTable } from "@/components";
import { useMemo, useState, useCallback } from "react";
import columns from "../data/receive/columnsData";
import useCorrespondenceAttachment from "../hooks/sent/useCorrespondenceAttachment";
import { chatService } from "../services";
import {
  CorrespondenceItemType,
  ReceiveMessageType,
} from "../types/receive/ReceiveMessage.type";
import { CorrespondenceResponseType } from "../types/sent/sent.type";
import ExelData from "../data/receive/receiveExelData";
import { RowComponent } from "tabulator-tables";
import { useLocation, useNavigate } from "react-router-dom";

export const TableFeature = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const currentPath = window.location.pathname;
  const [searchResults, setSearchResults] =
    useState<CorrespondenceResponseType>({
      sender: [],
      receiver: [],
    });
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const { data: correspondence, isLoading } =
    useCorrespondenceAttachment.useGetCorrespondence();
  const location = useLocation();
  const navigate = useNavigate();

  const receiveTable = location.pathname === "/letter/receive-table";
  const outreceiveTable = location.pathname === "/letter/Outreceive-table";
  const letterTable = location.pathname === "/letter/table";
  const outTable = location.pathname === "/letter/Outtable";
  const draftTable = location.pathname === "/letter/draft";

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

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const year = new Intl.DateTimeFormat("fa", { year: "numeric" }).format(
      date
    );
    const month = new Intl.DateTimeFormat("fa", { month: "2-digit" }).format(
      date
    );
    const day = new Intl.DateTimeFormat("fa", { day: "2-digit" }).format(date);
    return `${year}/${month}/${day}`;
  }, []);

  const formatConfidentialityLevel = useCallback((level?: string) => {
    switch (level) {
      case "confidential":
        return "محرمانه";
      case "secret":
        return "سری";
      case "top_secret":
        return "فوق سری";
      default:
        return "عادی";
    }
  }, []);

  const createRowData = useCallback(
    (item: CorrespondenceItemType) => {
      const senderName =
        (item.sender_details?.user?.first_name ?? "") +
        " " +
        (item.sender_details?.user?.last_name ?? "") +
        " " +
        "-" +
        (item.sender_details?.name ?? "نامشخص");

      const receiverName =
        item.is_internal !== false
          ? (item.receiver_internal_details?.user?.first_name ?? "") +
            " " +
            (item.receiver_internal_details?.user?.last_name ?? "") +
            " " +
            "-" +
            (item.receiver_internal_details?.name ?? "نامشخص")
          : item.receiver_external || "نامشخص";

      return {
        id: item.id,
        title: item.subject,
        number: item.number,
        sender: senderName,
        receiver: receiverName,
        send_date: formatDate(item.created_at),
        kind_of_correspondence:
          item.priority === "urgent" ? "اعلامیه" : "درخواست",
        status: "",
        seen: item.seen || false,
        confidentiality_level: formatConfidentialityLevel(
          item.confidentiality_level
        ),
        is_internal: item.is_internal,
        is_sender:
          correspondence?.sender.some((s) => s.id === item.id) ?? false,
        is_receiver:
          correspondence?.receiver.some((r) => r.id === item.id) ?? false,
      };
    },
    [formatDate, formatConfidentialityLevel, correspondence]
  );

  const mappedData = useMemo(() => {
    if (
      hasSearched &&
      searchResults.receiver &&
      searchResults.receiver.length > 0
    ) {
      return searchResults.receiver.map(createRowData);
    }

    if (
      hasSearched &&
      searchResults.sender &&
      searchResults.sender.length > 0 &&
      (!searchResults.receiver || searchResults.receiver.length === 0)
    ) {
      return searchResults.sender.map(createRowData);
    }

    if (!correspondence) return [];
    return [
      ...correspondence.receiver.map(createRowData),
      ...correspondence.sender.map(createRowData),
    ];
  }, [correspondence, searchResults, hasSearched, createRowData]);

  const filteredMappedData = useMemo(() => {
    if (!mappedData) return [];

    if (receiveTable) {
      return mappedData.filter(
        (item) => item.is_receiver && item.is_internal === true
      );
    } else if (outreceiveTable) {
      return mappedData.filter(
        (item) => item.is_receiver && item.is_internal === false
      );
    } else if (letterTable) {
      return mappedData.filter(
        (item) => item.is_sender && item.is_internal === true
      );
    } else if (outTable) {
      return mappedData.filter(
        (item) => item.is_sender && item.is_internal === false
      );
    } else if (draftTable) {
      return mappedData.filter((item) => item.sender);
    }

    return mappedData;
  }, [mappedData, receiveTable, outreceiveTable, letterTable, outTable]);

  const tableOptions = useMemo(
    () => ({
      rowFormatter: (row: RowComponent) => {
        const data = row.getData();
        if (data && data.seen === false) {
          row.getElement().style.backgroundColor = "#f5f5f5";
        }
      },
    }),
    []
  );

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

  if (isLoading) {
    return <LoaderLg />;
  }

  const noResultsFound =
    hasSearched &&
    !isSearching &&
    (!searchResults.receiver || searchResults.receiver.length === 0) &&
    (!searchResults.sender || searchResults.sender.length === 0);

  {
    filteredMappedData.length === 0 && (
      <div className="w-full text-center py-4 text-gray-500">
        نتیجه‌ای یافت نشد
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="flex mb-4">
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

        {currentPath === "/letter/Outreceive-table" && (
          <div className="  mr-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/letter/OutformMake")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                ایجاد نامه
              </button>
            </div>
          </div>
        )}
      </div>

      {isSearching && (
        <div className="w-full text-center py-4 text-gray-500">
          در حال جستجو...
        </div>
      )}

      {noResultsFound && (
        <div className="w-full text-center py-4 text-gray-500">
          نتیجه‌ای یافت نشد
        </div>
      )}

      <div className="overflow-x-auto">
        <TabulatorTable
          data={filteredMappedData}
          columns={columns()}
          title={
            receiveTable
              ? "پیام های دریافتی"
              : outreceiveTable
              ? "پیام های خارجی دریافتی"
              : letterTable
              ? "پیام های داخلی ارسالی"
              : outTable
              ? "پیام های خارجی ارسالی"
              : draftTable
              ? "پیام های پیش نویس"
              : ""
          }
          showActions={true}
          formatExportData={(item: ReceiveMessageType) => ExelData(item)}
          dateField="send_date"
          showDateFilter={!hasSearched}
          showSearchFilter={false}
          searchFields={searchFields}
          options={tableOptions}
        />
      </div>
    </div>
  );
};

export default TableFeature;
