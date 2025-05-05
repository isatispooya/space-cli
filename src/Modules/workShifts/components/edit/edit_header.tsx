import { ShiftDateResType } from "../../types";

// Header Component
const ShiftHeaderCom = ({
    shiftDates,
  }: {
    shiftDates: ShiftDateResType[] | undefined;
  }) => {
    return (
      <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">تاریخ‌های شیفت</h2>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-600">تعداد روزها:</span>
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {shiftDates?.length || 0} روز
                </span>
              </div>
              <div className="w-px h-3 bg-gray-300"></div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-600">روزهای کاری:</span>
                <span className="bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {shiftDates?.filter((date) => date.work_day).length || 0} روز
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ShiftHeaderCom;