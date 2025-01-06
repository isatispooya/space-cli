import { useSidebarStore, useSearchStore } from "../store";
import { IoClose } from "react-icons/io5";
import { menuItems } from "../data/menuItems";
import CustomMenuItem from "../components/MenuItem";
import { motion } from "framer-motion";
import bothLogo from "../../../../public/bothLogo.svg";

const SideBar = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const { search, setSearch } = useSearchStore();
  console.log(isOpen);

  const filteredMenuItems = menuItems.filter(item =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ?? false
  );

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleSidebar();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`fixed  top-0 right-0 h-full w-full z-50 transition-transform duration-700 ease-in-out ${
        isOpen ? "bg-transparent" : "pointer-events-none"
      } ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div
        className={`h-full w-[320px] overflow-y-auto bg-gradient-to-br from-[#5677BC] to-[#02205F] rounded-l-xl shadow-lg transition-all duration-700 transform ml-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } custom-scrollbar`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-800">
          <img src={bothLogo} alt="لوگو" className="h-16 w-auto" />
          <motion.button
            className="text-2xl text-white p-2 rounded-full hover:bg-white/20 hover:rotate-90 active:scale-90 transition-all duration-300"
            onClick={toggleSidebar}
            aria-label="بستن منو"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoClose className="w-6 h-6" />
          </motion.button>
        </div>
        <div className="p-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="جستجو..."
            className="w-full p-2 bg-blue-50 text-black rounded-lg border border-blue-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col p-4 space-y-2">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item, index) => (
              <CustomMenuItem
                key={index}
                item={item}
                className="flex items-center p-2 text-white hover:bg-blue-600 rounded-lg transition-colors duration-300"
              />
            ))
          ) : (
            <p className="text-white text-center">نتیجه‌ای یافت نشد</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
