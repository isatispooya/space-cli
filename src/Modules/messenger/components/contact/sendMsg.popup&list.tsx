import { motion, AnimatePresence } from "framer-motion";
import { FaPen } from "react-icons/fa";
import { ChatType } from "../../types";
import { CloseButton, DynamicList } from "@/components";
import UserListItem from "./contacts.list";

const SendMsgPopUp = ({
  onSelectUser,
  showAllUsers,
  setShowAllUsers,
  searchPositionQuery,
  setSearchPositionQuery,
  filteredPositionUsers,
  handlePositionUserClick,
  positionUsers,
}: ChatType["NewMessagePopupProps"]) => {
  const modalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (!showAllUsers) {
    console.log(positionUsers, onSelectUser);
  }

  return (
    <>
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 hidden sm:block z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => setShowAllUsers(!showAllUsers)}
          className="w-14 h-14 bg-gradient-to-r from-[#5677BC] to-[#4A67A6] rounded-xl shadow-md flex items-center justify-center text-white transition-shadow hover:shadow-lg"
        >
          <FaPen className=" text-[#CACACA]" />
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
              <div className="bg-gradient-to-r from-[#5677BC] to-[#5677BC] p-4 sm:p-5 text-white flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold">
                  لیست تمام کاربران
                </h3>
                <CloseButton onClick={() => setShowAllUsers(false)} size="md" />
              </div>

              <div className="overflow-y-auto max-h-[60vh] px-2 pb-4 sm:px-3">
                <DynamicList
                  data={filteredPositionUsers}
                  isPending={false}
                  searchQuery={searchPositionQuery}
                  visibleItems={10}
                  onSearchChange={setSearchPositionQuery}
                  onItemClick={handlePositionUserClick}
                  onLoadMore={() => {}}
                  renderItem={(position: ChatType["UserPositionType"]) => (
                    <UserListItem position={position} />
                  )}
                  noResultsMessage="کاربری یافت نشد"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SendMsgPopUp;
