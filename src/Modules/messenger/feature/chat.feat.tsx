import { useState } from "react";

import { ChatField } from "../components";
import { ContactsFeature } from "../feature";

const ChatFeature = () => {
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    avatar?: string;
  } | null>(null);
  const [showUserList, setShowUserList] = useState(true);

  const toggleUserList = () => {
    setShowUserList((prev) => !prev);
  };

  const handleUserSelect = (user: {
    id: string;
    name: string;
    avatar?: string;
  }) => {
    setSelectedUser(user);
    if (window.innerWidth < 768) {
      setShowUserList(false);
    }
  };

  return (
    <div className="conversation-container bg-gray-100 rounded-xl flex flex-col md:flex-row h-[calc(80vh)] p-2 sm:p-4 md:p-8 w-full max-w-[95%] md:max-w-[90%] lg:max-w-[80%] mx-auto overflow-hidden">
      <div className="md:hidden flex justify-start mb-2">
        <button
          onClick={toggleUserList}
          className="bg-[#5677BC] text-white p-2 rounded-lg flex items-center"
        >
          {showUserList ? "بستن لیست" : "نمایش کاربران"}
        </button>
      </div>

      <div
        className={`${
          showUserList ? "block" : "hidden"
        } md:block w-full md:w-1/3 lg:w-1/4 mb-4 md:mb-0`}
      >
        <ContactsFeature
          onSelectUser={handleUserSelect}
          selectedUserId={selectedUser?.id}
        />
      </div>

      <div
        className={`chat-container flex-1 ${
          showUserList ? "hidden" : "block"
        } md:block mx-0 md:mx-3 rounded-lg shadow-lg flex flex-col`}
      >
        {!selectedUser ? (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-gray-50">
            <div className="text-center p-4 sm:p-10 rounded-2xl bg-white shadow-md max-w-md border border-blue-100 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <span className="material-icons text-[#3b82f6] text-5xl sm:text-7xl p-3 sm:p-5 rounded-full bg-blue-50">
                  گفتگو
                </span>
              </div>
              <h3 className="text-gray-800 font-bold text-xl sm:text-2xl mb-3">
                شروع مکالمه
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                لطفاً یک گفتگو را انتخاب کنید یا گفتگوی جدیدی شروع کنید
              </p>
            </div>
          </div>
        ) : (
          <ChatField
            selectedUser={selectedUser}
            loading={false}
            onBackClick={() => setShowUserList(true)}
            onSubmit={() => {
              console.log("submit");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ChatFeature;
