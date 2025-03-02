import { useState, useEffect } from "react";
import CorrespondenceChatForm from "./correnpondence.chat.form";
import { FormikHelpers } from "formik";
import { CorrespondenceTypes } from "../types";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import useChat from "../hooks/useChat";
import { useProfile } from "@/Modules/userManagment";

const ConversationUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  const { data: messages } = useChat.useGetChat();
  const { data: profileData } = useProfile();

  const filterCurrentUser = (users: any[]) => {
    if (!profileData || !profileData.uniqueIdentifier) return users;

    return users.filter((user) => {
      return user.uniqueIdentifier !== profileData.uniqueIdentifier;
    });
  };

  useEffect(() => {
    if (messages && messages.length > 0) {
      const uniqueUsers = new Map();

      messages.forEach((message) => {
        const sender = message.sender_details;
        const receiver = message.receiver_details;

        if (!uniqueUsers.has(sender.id)) {
          uniqueUsers.set(sender.id, {
            id: sender.id.toString(),
            name: `${sender.first_name} ${sender.last_name}`,
            lastMessage: message.message,
            lastMessageTime: new Date(message.created_at).toLocaleTimeString(
              "fa-IR",
              { hour: "2-digit", minute: "2-digit" }
            ),
            isOnline: Math.random() > 0.5,
            avatar: null,
            uniqueIdentifier: sender.uniqueIdentifier,
          });
        }

        if (!uniqueUsers.has(receiver.id)) {
          uniqueUsers.set(receiver.id, {
            id: receiver.id.toString(),
            name: `${receiver.first_name} ${receiver.last_name}`,
            lastMessage: message.message,
            lastMessageTime: new Date(message.created_at).toLocaleTimeString(
              "fa-IR",
              { hour: "2-digit", minute: "2-digit" }
            ),
            isOnline: Math.random() > 0.5,
            avatar: null,
            uniqueIdentifier: receiver.uniqueIdentifier,
          });
        }
      });

      setUsers(filterCurrentUser(Array.from(uniqueUsers.values())));
    }
  }, [messages, profileData]);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleSendMessage = (actions: FormikHelpers<CorrespondenceTypes>) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      actions.resetForm();
    }, 1000);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUser = users.find((user) => user.id === selectedUserId);

  const handleNewChat = () => {
    setShowUserList(!showUserList);
  };

  const handleSelectNewUser = (userId: string) => {
    setSelectedUserId(userId);
    setShowUserList(false);
  };

  return (
    <div className="conversation-container flex h-[calc(100vh-100px)]">
      <div className="user-list-container w-1/3 border-l overflow-y-auto bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">لیست چت</h2>
          <IconButton
            onClick={handleNewChat}
            color="primary"
            className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-white"
            size="small"
            aria-label="چت جدید"
          >
            <span className="material-icons text-white text-xl">
              {showUserList ? "x" : "+"}
            </span>
          </IconButton>
        </div>

        <div className="p-3">
          <TextField
            fullWidth
            placeholder="جستجوی نام..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="material-icons text-gray-400">search</span>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="user-list">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`user-item p-3 border-b flex items-center cursor-pointer hover:bg-gray-100 ${
                selectedUserId === user.id ? "bg-gray-200" : ""
              }`}
              onClick={() => handleUserClick(user.id)}
            >
              <div className="relative">
                <div className="avatar w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <span>{user.name.charAt(0)}</span>
                  )}
                </div>
                {user.isOnline && (
                  <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="user-info flex-1">
                <div className="flex justify-between">
                  <div className="user-name font-medium">{user.name}</div>
                  {user.lastMessageTime && (
                    <div className="text-xs text-gray-500">
                      {user.lastMessageTime}
                    </div>
                  )}
                </div>
                {user.lastMessage && (
                  <div className="last-message text-sm text-gray-600 truncate">
                    {user.lastMessage}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-container flex-1">
        {showUserList ? (
          <div className="flex flex-col h-full bg-white">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">
                انتخاب کاربر برای گفتگوی جدید
              </h2>
            </div>
            <div className="p-3">
              <TextField
                fullWidth
                placeholder="جستجوی نام..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <span className="material-icons text-gray-400">
                        search
                      </span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="overflow-y-auto flex-1">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="user-item p-3 border-b flex items-center cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectNewUser(user.id)}
                >
                  <div className="avatar w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <span>{user.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="user-name font-medium">{user.name}</div>
                </div>
              ))}
            </div>
          </div>
        ) : selectedUserId ? (
          <CorrespondenceChatForm
            onSubmit={handleSendMessage}
            loading={loading}
            selectedUser={selectedUser}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <p className="text-gray-500 text-lg">
              لطفاً یک گفتگو را انتخاب کنید یا گفتگوی جدیدی را شروع کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationUsers;
