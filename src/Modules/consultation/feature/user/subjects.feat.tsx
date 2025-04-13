import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubjectCard from "../../components/user/subject.card";
import { translateCategory } from "../../data";
import { LoaderLg, NoContent } from "@/components";
import { ConsultationUserType } from "../../types";

interface ConsultationSubjectsProps {
  onSelectSubject: (id: string) => void;
  subjects: ConsultationUserType["SubjectsType"];
  isLoading: boolean;
  isError: boolean;
}

const ConsultationSubjects = ({
  onSelectSubject,
  subjects,
  isLoading,
  isError,
}: ConsultationSubjectsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = subjects
    ? [...new Set(subjects.map((subject) => subject.kind_of_consultant[0]))]
    : [];

  if (isLoading) {
    return <LoaderLg />;
  }
  if (isError) {
    return <NoContent label="خطایی رخ داده است" />;
  }

  const handleSelectSubject = (id: string) => {
    if (onSelectSubject) {
      onSelectSubject(id);
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4  py-4 rounded-xl shadow-lg bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      dir="rtl"
    >
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

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {subjects?.map((subject) => (
            <motion.div
              key={subject.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <SubjectCard
                subject={{
                  id: subject.id.toString(),
                  title: subject.title,
                  description: subject.description,
                  category: subject.kind_of_consultant[0],
                  price: subject.price,
                  image: subject.picture,
                  status: subject.status,
                }}
                onSelect={handleSelectSubject}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ConsultationSubjects;
