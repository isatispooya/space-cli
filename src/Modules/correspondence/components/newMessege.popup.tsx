import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPen } from "react-icons/fa";

const NewMessagePopup = ({
  onSelectUser,
  showAllUsers,
  setShowAllUsers,
  searchPositionQuery,
  setSearchPositionQuery,
  filteredPositionUsers,
  handlePositionUserClick,
  positionUsers,
}) => {
  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 hidden sm:block z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => setShowAllUsers(!showAllUsers)}
          className="w-14 h-14 bg-gradient-to-r from-[#5677BC] to-[#4A67A6] rounded-xl shadow-md flex items-center justify-center text-white transition-shadow hover:shadow-lg"
        >
          <span className="text-2xl">{showAllUsers ? "×" : "+"}</span>
        </button>
      </motion.div>

      {/* Modal Popup */}
      <AnimatePresence>
        {showAllUsers && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setShowAllUsers(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl w-full max-w-[90vw] sm:max-w-lg max-h-[85vh] overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#5677BC] to-[#5677BC] p-4 sm:p-5 text-white flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold">
                  لیست تمام کاربران
                </h3>
                <button
                  onClick={() => setShowAllUsers(false)}
                  className="p-2 rounded-full hover:bg-[#4A67A6] transition-colors"
                >
                  <span className="text-white text-xl sm:text-2xl">×</span>
                </button>
              </div>

              {/* Search Input */}
              <div className="px-4 py-3 sm:px-5 sm:py-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchPositionQuery}
                    onChange={(e) => setSearchPositionQuery(e.target.value)}
                    placeholder="جستجوی نام یا کد ملی"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5677BC] text-sm shadow-sm"
                  />
                  <FaPen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Users List */}
              <div className="overflow-y-auto max-h-[60vh] px-2 pb-4 sm:px-3">
                {filteredPositionUsers.map((position) => (
                  <motion.div
                    key={position.id}
                    whileHover={{ backgroundColor: "#F9FAFB" }}
                    className="p-3 sm:p-4 rounded-lg cursor-pointer flex items-center border-b border-gray-100 last:border-b-0"
                    onClick={() => handlePositionUserClick(position)}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#5677BC] text-white flex items-center justify-center overflow-hidden mr-3 sm:mr-4">
                      {position.user.profile_image ? (
                        <img
                          src={position.user.profile_image}
                          alt={`${position.user.first_name} ${position.user.last_name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-base sm:text-lg font-medium">
                          {position.user.first_name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm sm:text-base">
                        {`${position.user.first_name} ${position.user.last_name}`}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between mt-1">
                        <span>{position.user.uniqueIdentifier}</span>
                        <span className="text-[#5677BC] mt-1 sm:mt-0">
                          {position.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {filteredPositionUsers.length === 0 && (
                  <div className="p-4 text-center text-gray-500 text-sm sm:text-base">
                    کاربری یافت نشد
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewMessagePopup;