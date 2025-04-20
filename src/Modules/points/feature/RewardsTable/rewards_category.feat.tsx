import { useState } from "react";
import { CATEGORY_CHOICES } from "./data/categotyData";
import WaveBackground from "./components/wave_category";
import { CategoryIconsProps } from "../../types/RewardsTable.type";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryIcons({
  setSelected,
  selected,
}: CategoryIconsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative py-10 px-6 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 right-0 opacity-20 w-72 h-72 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 opacity-20 w-72 h-72 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4 py-4"
        >
          {CATEGORY_CHOICES.map(([key, title, Icon, gradient], index) => {
            const isHovered = hovered === key;
            const isSelected = selected === key;
            const isActive = isSelected || isHovered;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(isSelected ? null : key)}
                className="group flex flex-col items-center relative cursor-pointer"
              >
                <motion.div 
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div
                    className={`category-icon w-16 h-16 flex items-center justify-center rounded-2xl relative overflow-hidden shadow-lg ${
                      isActive ? 'ring-2 ring-offset-2' : ''
                    } ${isSelected ? 'ring-blue-500' : isHovered ? 'ring-purple-400' : ''}`}
                    style={{
                      boxShadow: isActive 
                        ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <WaveBackground gradient={gradient} />
                    
                    <motion.div
                      animate={{ 
                        rotate: isActive ? [0, 10, -10, 0] : 0,
                        scale: isActive ? 1.2 : 1 
                      }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <Icon
                        size={28}
                        strokeWidth={2.4}
                        className={`transition-all duration-300 ${
                          isActive ? "text-white drop-shadow-lg" : "text-white"
                        }`}
                      />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          width="14"
                          height="14"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                <motion.span 
                  className="mt-3 text-sm font-medium text-center line-clamp-2 h-10 px-1"
                  style={{ 
                    textShadow: isActive ? '0 0 10px rgba(255,255,255,0.5)' : 'none' 
                  }}
                  animate={{ 
                    color: isActive ? "#1F2937" : "#4B5563",
                    fontWeight: isActive ? "600" : "500"
                  }}
                >
                  {title}
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
