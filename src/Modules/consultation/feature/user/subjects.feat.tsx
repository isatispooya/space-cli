import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubjectCard from "../../components/user/subject.card";
import { subjects, translateCategory } from "../../data";
import { BiSearch } from "react-icons/bi";

const categories = [...new Set(subjects.map((subject) => subject.category))];

interface ConsultationSubjectsProps {
  onSelect: (subject: SubjectType) => void;
}

export const ConsultationSubjects = ({ onSelect }: ConsultationSubjectsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-12 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          موضوع مشاوره خود را انتخاب کنید
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          از بین مشاوره‌های تخصصی ما که متناسب با نیازهای شما طراحی شده‌اند،
          انتخاب کنید
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-2xl mx-auto mb-8"
      >
        <div className="relative">
          <BiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در موضوعات مشاوره..."
            className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
          />
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
              ${
                selectedCategory === category
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {translateCategory(category)}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid of Subject Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <motion.div
                key={subject.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <SubjectCard
                  subject={subject}
                  onSelect={(id) => console.log("Selected:", id)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-lg text-gray-600 dark:text-gray-300">
                هیچ موضوع مشاوره‌ای مطابق با جستجوی شما یافت نشد.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ConsultationSubjects;
