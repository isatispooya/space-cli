import { useState } from "react";
import ConversationUsers from "./conversationUsers";
import CorrespondenceChatForm from "./correnpondence.chat.form";
import useChat from "../hooks/useChat";
import { FormikHelpers } from "formik";

interface CorrespondenceTypes {
  content: string;
}

const Conversation = () => {
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string; avatar?: string } | null>(null);
  const { mutate: sendMessage } = useChat.useCreateChat();

  const handleUserSelect = (user: { id: string; name: string; avatar?: string }) => {
    setSelectedUser(user);
  };

  const handleSendMessage = (
    values: CorrespondenceTypes,
    actions: FormikHelpers<CorrespondenceTypes>
  ) => {
    if (!selectedUser) return;

    sendMessage({
      message: values.content,
      receiver_id: selectedUser.id,
    }, {
      onSuccess: () => {
        actions.resetForm();
      }
    });
  };

  return (
    <div className="conversation-container bg-gray-100 rounded-xl flex h-[calc(80vh)] p-8 max-w-[80%] mx-auto overflow-hidden">
      <ConversationUsers onSelectUser={handleUserSelect} selectedUserId={selectedUser?.id} />
      {!selectedUser ? (
        <div className="chat-container flex-1 mx-3 rounded-lg shadow-lg flex flex-col">
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-gray-50">
            <div className="text-center p-10 rounded-2xl bg-white shadow-md max-w-md border border-blue-100 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <span className="material-icons text-[#3b82f6] text-7xl p-5 rounded-full bg-blue-50">
                  گفتگو
                </span>
              </div>
              <h3 className="text-gray-800 font-bold text-2xl mb-3">شروع مکالمه</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                لطفاً یک گفتگو را انتخاب کنید یا گفتگوی جدیدی شروع کنید
              </p>
              <div className="mt-6">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  شروع گفتگوی جدید
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-container flex-1 mx-3 rounded-lg shadow-lg flex flex-col">
          <CorrespondenceChatForm 
            onSubmit={handleSendMessage}
            selectedUser={selectedUser}
            loading={false}
          />
        </div>
      )}
    </div>
  );
};

export default Conversation;

