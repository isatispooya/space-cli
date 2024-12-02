import { LuTable, LuPlusSquare } from "react-icons/lu";

const Toolbar = () => {
  return (
    <div className="bg-gray-100 border-b border-gray-200 px-3 py-1.5 rounded-lg flex items-center justify-start shadow-sm">
      <button
        onClick={() => {
          const basePath = window.location.pathname.split('/')[1];
          window.location.href = `/${basePath}/table`;
        }}
        className="flex items-center px-4 mr-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 space-x-2 space-x-reverse"
      >
        <LuTable  className="w-5 h-5" />
        <span>جدول</span>
      </button>

      <button
        onClick={() => {
          const basePath = window.location.pathname.split('/')[1];
          window.location.href = `/${basePath}/create`;
        }}
        className="flex items-center px-4 py-2 mr-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 space-x-2 space-x-reverse"
      >
        <LuPlusSquare className="w-5 h-5" />
        <span>ایجاد</span>
      </button>
    </div>
  );
};

export default Toolbar;

