import { useSidebarStore, useSearchStore } from "../store";
import { IoClose } from "react-icons/io5";
import { menuItems } from "../data/menuItems";
import CustomMenuItem from "../components/MenuItem";


const SideBar = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const { search, setSearch } = useSearchStore();
  console.log(isOpen);

  return (
    <div className={`w-full h-full z-50 ${
        isOpen ? "absolute translate-x-0" : "hidden translate-x-full"
      }`}>
        

    <div
      className={`h-full w-[380px]  z-100 bg-blue-900 shadow-2xl transition-all duration-300 transform `}
    >

      <div className="w-full flex justify-between items-center p-4 border-b border-blue-800">
        <h1 className="text-2xl font-bold text-white">منو</h1>
        <button
          className="text-4xl cursor-pointer text-white hover:text-gray-200 hover:scale-110 active:scale-95 transition-all duration-200 rounded-full p-2 hover:bg-blue-800"
          onClick={toggleSidebar}
          aria-label="بستن منو"
        >
          <IoClose />
        </button>
      </div>
      <div className="w-full flex justify-center items-center p-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="جستجو"
          className="w-full p-3 bg-blue-800 text-white rounded-lg border border-blue-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="w-full flex flex-col p-4">
        {menuItems
          .map((item, index) => (
            <CustomMenuItem key={index} item={item} />
          ))}
      </div>
    </div>
    </div>
  );
};

export default SideBar;
