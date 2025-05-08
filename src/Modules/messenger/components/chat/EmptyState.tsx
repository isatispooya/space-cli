import React from "react";

// کامپوننت نمایش حالت بدون کاربر انتخاب شده
const EmptyState: React.FC = () => (
  <div className="flex-grow flex justify-center items-center bg-gray-50 text-gray-500">
    لطفاً یک کاربر را برای شروع گفتگو انتخاب کنید
  </div>
);

export default EmptyState; 