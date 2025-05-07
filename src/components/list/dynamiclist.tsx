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
  searchFields?: string[]; // فیلدهایی که باید در آنها جستجو شود
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
  searchFields = [], // فیلدهای پیش‌فرض برای جستجو خالی است
}: DynamicListProps<T>) => {
  // اطمینان حاصل کنید که data همیشه یک آرایه است
  const safeData = Array.isArray(data) ? data : [];

  // فیلتر کردن داده‌ها بر اساس جستجو
  const filteredData = safeData.filter((item) => {
    if (!searchQuery.trim()) return true; // اگر عبارت جستجو خالی باشد، همه آیتم‌ها را نشان بده
    
    const query = searchQuery.toLowerCase();
    
    // اگر فیلدهای خاصی برای جستجو مشخص شده باشند، فقط در آنها جستجو کن
    if (searchFields.length > 0) {
      return searchFields.some(field => {
        const value = item[field as keyof T];
        // اگر مقدار فیلد یک رشته باشد، در آن جستجو کن
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query);
        }
        // اگر مقدار فیلد یک عدد باشد، آن را به رشته تبدیل کن و جستجو کن
        if (typeof value === 'number') {
          return value.toString().toLowerCase().includes(query);
        }
        return false;
      });
    } else {
      // در غیر این صورت، کل شیء را به رشته تبدیل کن و جستجو کن (رفتار قبلی)
      return JSON.stringify(item).toLowerCase().includes(query);
    }
  });

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
    <div className="w-full flex flex-col bg-white rounded-lg shadow-sm p-4">
      {!hideSearch && ( // Only render search bar if hideSearch is false
        <div className="mb-4 w-full">
          <input
            type="text"
            placeholder="جستجو..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
      )}

      <ul className="space-y-2 mt-4 w-full">
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
