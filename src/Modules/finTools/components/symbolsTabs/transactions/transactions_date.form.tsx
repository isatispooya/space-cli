import { motion } from "framer-motion";
import { SymbolsType } from "../../../types/symbols.type";
import symbolsStore from "../../../store/symbols.store";

const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

const TransactionsDate = ({
  dates,
}: {
  dates: SymbolsType["transactionsDatesRes"]["dates"];
}) => {
  const { dateRange, setDateRange, setTransactionsStep } = symbolsStore();

  const getPersianMonthName = (monthNumber: string): string =>
    PERSIAN_MONTHS[parseInt(monthNumber) - 1] || monthNumber;

  const handleDateClick = (
    dateItem: NonNullable<SymbolsType["transactionsDatesRes"]["dates"][0]>
  ) => {
    if (!dateItem.id) return;

    if (!dateRange.startId) {
      setDateRange({ startId: dateItem.id, endId: null });
      return;
    }

    if (!dateRange.endId) {
      const startDateItem = dates.find((d) => d.id === dateRange.startId);
      if (!startDateItem?.date || !dateItem.date) return;

      const startDate = new Date(startDateItem.date);
      const endDate = new Date(dateItem.date);
      setDateRange({
        startId: endDate < startDate ? dateItem.id : dateRange.startId,
        endId: endDate < startDate ? dateRange.startId : dateItem.id,
      });
      return;
    }

    setDateRange({ startId: dateItem.id, endId: null });
  };

  const isDateInRange = (
    dateItem: NonNullable<SymbolsType["transactionsDatesRes"]["dates"][0]>
  ) => {
    if (!dateItem.id || !dateItem.date || !dateRange.startId) return false;
    if (!dateRange.endId) return dateItem.id === dateRange.startId;

    const startDateItem = dates.find((d) => d.id === dateRange.startId);
    const endDateItem = dates.find((d) => d.id === dateRange.endId);
    if (!startDateItem?.date || !endDateItem?.date) return false;

    const currentDate = new Date(dateItem.date);
    const startDate = new Date(startDateItem.date);
    const endDate = new Date(endDateItem.date);

    return currentDate >= startDate && currentDate <= endDate;
  };

  const getSelectedDateDisplay = (id: number | null) => {
    if (!id) return "-";
    const dateItem = dates.find((d) => d.id === id);
    return dateItem?.date
      ? new Date(dateItem.date).toLocaleDateString("fa-IR")
      : "-";
  };

  const handleProceed = () => {
    if (dateRange.startId && dateRange.endId) {
      setTransactionsStep(1);
    }
  };

  if (!dates.length) {
    return (
      <div className="p-2 text-center text-gray-500 text-sm">
        هیچ تاریخی یافت نشد
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">از:</span>
          <span className="font-medium">
            {getSelectedDateDisplay(dateRange.startId)}
          </span>
          <span className="text-gray-600">تا:</span>
          <span className="font-medium">
            {getSelectedDateDisplay(dateRange.endId)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {(dateRange.startId || dateRange.endId) && (
            <button
              onClick={() => setDateRange({ startId: null, endId: null })}
              className="text-xs text-red-500 hover:text-red-600"
            >
              پاک کردن
            </button>
          )}
          {dateRange.startId && dateRange.endId && (
            <button
              onClick={handleProceed}
              className="px-4 py-1 text-xs text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
            >
              ادامه
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dates.map(
          (
            dateItem: NonNullable<
              SymbolsType["transactionsDatesRes"]["dates"][0]
            >
          ) => {
            if (!dateItem.date || !dateItem.shamsi_date) return null;

            const isInRange = isDateInRange(dateItem);
            const isStart = dateItem.id === dateRange.startId;
            const isEnd = dateItem.id === dateRange.endId;

            return (
              <motion.button
                key={dateItem.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDateClick(dateItem)}
                className={`
                relative p-2 text-center rounded-md text-xs
                ${
                  isStart || isEnd
                    ? "bg-blue-500 text-white"
                    : isInRange
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-50 hover:bg-gray-100"
                }
                ${!dateItem.open_market && "opacity-50"}
              `}
              >
                <div className="font-medium">
                  {dateItem.shamsi_date.split("-")[2]}
                </div>
                <div className="text-[10px] mt-0.5 opacity-75">
                  {getPersianMonthName(dateItem.shamsi_date.split("-")[1])}
                </div>
              </motion.button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default TransactionsDate;
