import { LuTable, LuPlusSquare } from "react-icons/lu";

const Toolbar = () => {
  return (
    <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            const basePath = window.location.pathname.split("/")[1];
            window.location.href = `/${basePath}/table`;
          }}
          className="flex items-center px-3 py-1.5 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 space-x-2 space-x-reverse"
        >
          <LuTable className="w-4 h-4" />
          <span className="text-sm">جدول</span>
        </button>

        <button
          onClick={() => {
            const basePath = window.location.pathname.split("/")[1];
            window.location.href = `/${basePath}/create`;
          }}
          className="flex items-center px-3 py-1.5 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 space-x-2 space-x-reverse"
        >
          <LuPlusSquare className="w-4 h-4" />
          <span className="text-sm">ایجاد</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
