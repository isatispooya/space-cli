import { useState, useEffect, useMemo } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import useChat from "../hooks/useChat";
import { useProfile } from "@/Modules/userManagment";

interface User {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: string;
  isOnline: boolean;
  avatar: string | null;
  uniqueIdentifier: string;
}

interface ConversationUsersProps {
  onSelectUser: (user: { id: string; name: string; avatar?: string }) => void;
  selectedUserId?: string | null;
}

const ConversationUsers = ({
  onSelectUser,
  selectedUserId,
}: ConversationUsersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const { data: usersData } = useChat.useGetUsersByPosition();
  const { data: messages } = useChat.useGetChat();
  const { data: profileData } = useProfile();
  const [showAllUsers, setShowAllUsers] = useState(false);

  useEffect(() => {
    if (messages && messages.length > 0 && profileData) {
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

      const usersList = Array.from(uniqueUsers.values()) as User[];
      const filteredUsers = profileData.uniqueIdentifier
        ? usersList.filter(
            (user) => user.uniqueIdentifier !== profileData.uniqueIdentifier
          )
        : usersList;

      setUsers(filteredUsers);
    }
  }, [messages, profileData]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const handleUserClick = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      onSelectUser({
        id: user.id,
        name: user.name,
        avatar: user.avatar || undefined,
      });
    }
  };

  const SearchInput = ({
    onChange,
  }: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      value={searchQuery}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <span className="material-icons text-gray-400">جستجو</span>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "24px",
          transition: "all 0.3s ease",
          backgroundColor: "#f5f5f5",
          "&:hover fieldset": {
            borderColor: "#5677BC",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#5677BC",
            boxShadow: "0 0 0 3px rgba(41, 210, 199, 0.1)",
          },
        },
      }}
    />
  );

  const UserAvatar = ({ user }: { user: User }) => (
    <div className="relative">
      <div className="avatar w-10 h-10 rounded-full bg-[#5677BC] text-white flex items-center justify-center mr-3">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full"
          />
        ) : (
          <span className="text-md font-semibold">{user.name.charAt(0)}</span>
        )}
      </div>
      {user.isOnline && (
        <div className="absolute bottom-0 right-3 w-2.5 h-2.5 bg-[#FA2566] rounded-full border-2 border-white"></div>
      )}
    </div>
  );

  return (
    <div className="user-list-container w-full h-full border-l bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl flex flex-col relative">
      <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-gradient-to-r from-[#5677BC] to-[#5677BC] text-white rounded-t-xl">
        <h2 className="text-lg sm:text-xl font-bold">اسپیس گرام</h2>
      </div>

      <div className="p-2 sm:p-4">
        <SearchInput onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="user-list overflow-y-auto flex-1">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`user-item py-2 sm:py-3 px-3 sm:px-4 border-b flex items-center cursor-pointer transition-all duration-300 ${
              selectedUserId === user.id
                ? "bg-[#5677BC]/20 border-r-4 border-r-[#5677BC]"
                : "hover:bg-gray-50"
            }`}
            onClick={() => handleUserClick(user.id)}
          >
            <UserAvatar user={user} />
            <div className="user-info flex-1 min-w-0 mr-2">
              <div className="flex justify-between items-center">
                <div className="user-name font-semibold text-xs sm:text-sm truncate">
                  {user.name}
                </div>
                {user.lastMessageTime && (
                  <div className="text-xs text-gray-500 whitespace-nowrap mr-1 sm:mr-2">
                    {user.lastMessageTime}
                  </div>
                )}
              </div>
              {user.lastMessage && (
                <div className="last-message text-xs text-gray-600 truncate mt-1">
                  {user.lastMessage}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 sm:block hidden">
        <button
          onClick={() => setShowAllUsers(!showAllUsers)}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#5677BC] to-[#4A67A6] rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center text-white"
        >
          <span className="material-icons text-xl sm:text-2xl">
            {showAllUsers ? "x" : "+"}
          </span>
        </button>
      </div>

      {showAllUsers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg max-h-[80vh] overflow-hidden shadow-2xl transform transition-all">
            <div className="bg-gradient-to-r from-[#5677BC] to-[#5677BC] p-3 sm:p-4 text-white flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-bold">
                لیست تمام کاربران
              </h3>
              <IconButton
                onClick={() => setShowAllUsers(false)}
                className="text-white hover:bg-[#4A67A6] transition-all"
                size="small"
              >
                <span className="material-icons text-white">x</span>
              </IconButton>
            </div>
            <div className="p-3 sm:p-4">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <span className="material-icons text-gray-400">
                        جستجو
                      </span>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              />
            </div>
            <div className="overflow-y-auto max-h-[50vh] sm:max-h-[60vh] p-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg cursor-pointer flex items-center"
                  onClick={() => {
                    handleUserClick(user.id);
                    setShowAllUsers(false);
                  }}
                >
                  <UserAvatar user={user} />
                  <div className="mr-2 sm:mr-3">
                    <div className="font-semibold text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">
                      {user.uniqueIdentifier}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationUsers;
