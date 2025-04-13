import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap gap-2 mb-6"
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategorySelect(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};
export default CategoryFilter;
