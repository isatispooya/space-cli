import { motion, AnimatePresence } from "framer-motion";
import { FaPen } from "react-icons/fa";
import { ChatType } from "../../types";
import { CloseButton, DynamicList } from "@/components";
import ContactsList from "./contacts.list";
import { useState, useEffect, useCallback } from "react";
import { usePosition } from "@/Modules/positions/hooks/usePosition";
import { server } from "@/api/server";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
  profile_image: string | null;
  online: boolean;
  last_seen: string | null;
  mobile: string;
  account_number: string | null;
  name?: string;
}

const SendMsgPopUp = ({
  onSelectUser,
  showAllUsers,
  setShowAllUsers,
  searchPositionQuery,
  setSearchPositionQuery,
}: ChatType["NewMessagePopupProps"]) => {
  const { data: positionUsers, isPending } = usePosition.useGetUserOfPosition();
  const [filteredPositionUsers, setFilteredPositionUsers] = useState<
    UserData[]
  >([]);
  const [visibleItemsCount, setVisibleItemsCount] = useState<number>(50);

  const searchableFields = [
    "first_name",
    "last_name",
    "uniqueIdentifier",
    "mobile",
    "account_number",
    "name",
  ];

  useEffect(() => {
    if (positionUsers && Array.isArray(positionUsers)) {
      const userData = positionUsers as unknown as UserData[];
      const mappedUsers = userData.map((user) => ({
        id: Number(user.id) || 0,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        uniqueIdentifier: user.uniqueIdentifier || "",
        profile_image: server + user.profile_image || null,
        online: user.online || false,
        last_seen: user.last_seen || null,
        mobile: user.mobile || "",
        account_number: user.account_number || null,
        name: user.name || "",
      }));
      setFilteredPositionUsers(mappedUsers);
      if (mappedUsers.length > 0) {
        setVisibleItemsCount(mappedUsers.length);
      }
    }
  }, [positionUsers]);

  const handleLoadMore = useCallback(() => {
    setVisibleItemsCount((prev) => {
      const max = filteredPositionUsers.length;
      const newValue = prev + 30;
      return newValue > max ? max : newValue;
    });
  }, [filteredPositionUsers.length]);

  const handleUserClick = (user: UserData) => {
    if (onSelectUser) {
      console.log("Selected user:", user);

      onSelectUser({
        id: String(user.id),
        name: `${user.first_name} ${user.last_name}`,
        avatar: user.profile_image || undefined,
      });
      setShowAllUsers(false);
    }
  };

  const modalVariants = {
    hidden: { display: "none", y: 20 },
    visible: { display: "block", y: 0 },
    exit: { display: "none", y: 20 },
  };

  const backdropVariants = {
    hidden: { display: "none" },
    visible: { display: "flex" },
  };

  return (
    <>
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 hidden sm:block z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => {
            console.log("Toggle users list, current state:", !showAllUsers);
            setShowAllUsers(!showAllUsers);
          }}
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
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex p-4 sm:p-6 justify-center items-center"
            onClick={() => setShowAllUsers(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl w-full max-w-[90vw] sm:max-w-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-[#5677BC] to-[#5677BC] p-4 sm:p-5 text-white flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold ">
                  لیست تمام کاربران ({filteredPositionUsers.length})
                </h3>
                <CloseButton onClick={() => setShowAllUsers(false)} size="md" />
              </div>

              <div className="overflow-y-auto max-h-[60vh] px-2 pb-4 sm:px-3 justify-center">
                {isPending ? (
                  <div className="flex justify-center items-center h-40">
                    در حال بارگذاری...
                  </div>
                ) : filteredPositionUsers.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    کاربری یافت نشد
                  </div>
                ) : (
                  <DynamicList
                    data={filteredPositionUsers}
                    isPending={isPending}
                    searchQuery={searchPositionQuery}
                    visibleItems={visibleItemsCount}
                    onSearchChange={setSearchPositionQuery}
                    onItemClick={handleUserClick}
                    onLoadMore={handleLoadMore}
                    renderItem={(user: UserData) => (
                      <ContactsList position={user} />
                    )}
                    noResultsMessage="کاربری یافت نشد"
                    searchFields={searchableFields}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SendMsgPopUp;
