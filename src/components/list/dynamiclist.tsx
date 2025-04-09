import React, { useEffect } from "react";
import { motion } from "framer-motion";

import { useInView } from "react-intersection-observer"; // برای Infinite Scroll

interface DynamicListProps<T> {
  data: T[] | null; // داده‌های ورودی
  isPending: boolean; // وضعیت بارگذاری
  searchQuery: string; // مقدار جستجو
  visibleItems: number; // تعداد آیتم‌های قابل مشاهده
  onSearchChange: (query: string) => void; // تابع تغییر جستجو
  onItemClick: (item: T) => void; // تابع کلیک روی آیتم
  onLoadMore: () => void; // تابع بارگذاری بیشتر داده‌ها
  renderItem: (item: T) => React.ReactNode; // تابع رندر کردن هر آیتم
  noResultsMessage?: string;
  hideSearch?: boolean; // New prop with default value false
}

const DynamicList = <T extends object>({
  data,
  isPending,
  searchQuery,
  visibleItems,
  onSearchChange,
  onItemClick,
  onLoadMore,
  renderItem,
  noResultsMessage = "نتیجه‌ای یافت نشد.",
  hideSearch = false, // Default to false, meaning search is visible by default
}: DynamicListProps<T>) => {
  // اطمینان حاصل کنید که data همیشه یک آرایه است
  const safeData = Array.isArray(data) ? data : [];

  // فیلتر کردن داده‌ها بر اساس جستجو
  const filteredData = safeData.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && !isPending && filteredData.length > visibleItems) {
      onLoadMore();
    }
  }, [inView, isPending, onLoadMore, filteredData.length, visibleItems]);

  if (isPending && filteredData.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">بارگذاری...</div>
    );
  }

  return (
    <div className="rounded-lg shadow-lg bg-white p-4">
      {!hideSearch && ( // Only render search bar if hideSearch is false
        <div className="mb-4">
          <input
            type="text"
            placeholder="جستجو..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
      )}

      <ul className="space-y-2 mt-4">
        {filteredData.length > 0 ? (
          <>
            {filteredData.slice(0, visibleItems).map((item, index) => (
              <motion.li
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                onClick={() => onItemClick(item)}
              >
                {renderItem(item)}
              </motion.li>
            ))}

            {filteredData.length > visibleItems && (
              <div ref={ref} className="flex justify-center items-center h-16">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </>
        ) : (
          <div className="p-4 text-center text-gray-500">
            {noResultsMessage}
          </div>
        )}
      </ul>
    </div>
  );
};

export default DynamicList;
