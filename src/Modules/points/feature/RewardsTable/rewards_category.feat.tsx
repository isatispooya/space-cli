import { useState } from "react";
import { CATEGORY_CHOICES } from "./data/categotyData";
import WaveBackground from "./components/wave_category";
import { CategoryIconsProps } from "../../types/RewardsTable.type";

export default function CategoryIcons({
  setSelected,
  selected,
}: CategoryIconsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-12 lg:grid-cols-8 xl:grid-cols-12 gap-3 py-8 px-4">
      {CATEGORY_CHOICES.map(([key, title, Icon, gradient]) => {
        const isHovered = hovered === key;
        const isSelected = selected === key;
        const isActive = isSelected || isHovered;

        return (
          <div
            key={key}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(isSelected ? null : key)}
            className="group flex flex-col items-center relative cursor-pointer transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative overflow-hidden">
              <div
                className={`category-icon w-14 h-14 flex items-center justify-center rounded-2xl relative overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 ease-in-out ${
                  isSelected ? "selected" : ""
                }`}
              >
                <WaveBackground gradient={gradient} />

                <Icon
                  size={24}
                  strokeWidth={2.6}
                  className={`relative z-10 transition-all duration-300 ${
                    isActive ? "text-white font-bold" : "text-white font-bold  "
                  }`}
                />
              </div>
              {isSelected && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="12"
                    height="12"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              )}
            </div>
            <span className="mt-2 text-xs font-medium text-gray-600 group-hover:text-black text-center line-clamp-2 h-8">
              {title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
