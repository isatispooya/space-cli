import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConsultantCard } from "../../components";
import type { ConsultationUserType } from "../../types";
import { BiSearch } from "react-icons/bi";

const consultants: ConsultationUserType["ConsultantsType"] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "Financial Planning Expert",
    imageUrl: "/path/to/image.jpg",
    rating: 4.9,
    reviewCount: 128,
    experience: 8,
    expertise: ["Investment Planning", "Retirement", "Tax Strategy"],
    hourlyRate: 150,
    completedSessions: 342,
    nextAvailable: "Today",
    availableSlots: ["2:00 PM", "4:30 PM", "5:00 PM"],
    isOnline: true,
    status: "Available",
  },
];

const expertiseAreas = [...new Set(consultants.flatMap((c) => c.expertise))];

export const ConsultantsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(
    null
  );
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const filteredConsultants = consultants.filter((consultant) => {
    const matchesSearch =
      consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultant.expertise.some((exp) =>
        exp.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesExpertise =
      !selectedExpertise || consultant.expertise.includes(selectedExpertise);
    const matchesRating = !ratingFilter || consultant.rating >= ratingFilter;
    return matchesSearch && matchesExpertise && matchesRating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Our Expert Consultants
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Connect with our experienced professionals for personalized
          consultation
        </p>
      </motion.div>
      <div className="max-w-2xl mx-auto mb-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or expertise..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {expertiseAreas.map((expertise) => (
            <motion.button
              key={expertise}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setSelectedExpertise(
                  selectedExpertise === expertise ? null : expertise
                )
              }
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  selectedExpertise === expertise
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm dark:bg-gray-800 dark:text-gray-200"
                }`}
            >
              {expertise}
            </motion.button>
          ))}
        </motion.div>
        <div className="flex justify-center gap-4">
          {[4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                setRatingFilter(ratingFilter === rating ? null : rating)
              }
              className={`flex items-center px-4 py-2 rounded-lg text-sm
                ${
                  ratingFilter === rating
                    ? "bg-yellow-400 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
                }`}
            >
              {rating}+ ★
            </button>
          ))}
        </div>
      </div>
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredConsultants.map((consultant) => (
            <motion.div
              key={consultant.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ConsultantCard
                consultant={consultant}
                onSelect={(id) => console.log("Selected consultant:", id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ConsultantsList;
