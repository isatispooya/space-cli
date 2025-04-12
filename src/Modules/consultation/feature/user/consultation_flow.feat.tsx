// src/Modules/consultation/feature/user/consultation_flow.feat.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConsultationSubjects , ConsultantsList } from "./";
import type { SubjectType } from "../../types";

export const ConsultationFlow = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | null>(null);

  const handleSubjectSelect = (subject: SubjectType) => {
    setSelectedSubject(subject);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <AnimatePresence mode="wait">
        {!selectedSubject ? (
          // Subjects Selection View
          <motion.div
            key="subjects"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ConsultationSubjects
              onSelect={(subject) => handleSubjectSelect(subject)}
            />
          </motion.div>
        ) : (
          // Consultants Selection View
          <motion.div
            key="consultants"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="relative"
          >
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-4 top-4 flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white z-10"
              onClick={handleBackToSubjects}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Topics
            </motion.button>

            {/* Selected Subject Summary */}
            <div className="absolute right-4 top-4 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-10">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Selected Topic: {selectedSubject.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {selectedSubject.description}
              </p>
            </div>

            {/* Consultants List */}
            <ConsultantsList
              selectedSubject={selectedSubject}
              onConsultantSelect={(consultant) =>
                console.log("Selected consultant:", consultant)
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConsultationFlow;