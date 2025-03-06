import { useState, useEffect, useMemo } from "react";
import useChat from "../hooks/useChat";
import { useProfile } from "@/Modules/userManagment";
import { server } from "@/api/server";
import { ChatType } from "../types";
import { ContactsCard, SendMsgPopUp } from "../components";
import { SearchInput } from "@/components";

const ContactsFeature = ({
  onSelectUser,
  selectedUserId,
}: ChatType["ConversationUsersProps"]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<ChatType["UserMessageType"][]>([]);
  const { data: usersData } = useChat.useGetUsersByPosition();
  const { data: messages } = useChat.useGetChat();
  const { data: profileData } = useProfile();
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [positionUsers, setPositionUsers] = useState<
    ChatType["UserPositionType"][]
  >([]);
  const [searchPositionQuery, setSearchPositionQuery] = useState("");

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
            profile_image: server + sender.profile_image || null,
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
            profile_image: server + receiver.profile_image || null,
          });
        }
      });

      const usersList = Array.from(
        uniqueUsers.values()
      ) as ChatType["UserMessageType"][];
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
        profile_image: user.profile_image || undefined,
      });
    }
  };

  const handlePositionUserClick = (position: ChatType["UserPositionType"]) => {
    onSelectUser({
      id: position.user.id.toString(),
      name: `${position.user.first_name} ${position.user.last_name}`,
      avatar: undefined,
      profile_image: position.user.profile_image || undefined,
    });
    setShowAllUsers(false);
  };

  const filteredPositionUsers = useMemo(() => {
    if (!positionUsers) return [];

    return positionUsers.filter((user) => {
      const fullName = `${user.user.first_name} ${user.user.last_name}`;
      return (
        fullName.toLowerCase().includes(searchPositionQuery.toLowerCase()) ||
        user.user.uniqueIdentifier.includes(searchPositionQuery)
      );
    });
  }, [positionUsers, searchPositionQuery]);

  useEffect(() => {
    if (usersData && Array.isArray(usersData)) {
      setPositionUsers(usersData);
    }
  }, [usersData]);

  return (
    <div className="user-list-container w-full h-full border-l bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl flex flex-col relative">
      <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-gradient-to-r from-[#5677BC] to-[#5677BC] text-white rounded-t-xl">
        <h2 className="text-lg sm:text-xl font-bold">اسپیس گرام</h2>
      </div>

      <div className="p-2 sm:p-4">
        <SearchInput
          placeholder="جستوجو..."
          onSearch={(value) => setSearchQuery(value)}
        />
      </div>

      <ContactsCard
        userProfileData={filteredUsers}
        selectedUserId={selectedUserId}
        handleUserClick={handleUserClick}
      />

      <SendMsgPopUp
        onSelectUser={onSelectUser}
        showAllUsers={showAllUsers}
        setShowAllUsers={setShowAllUsers}
        searchPositionQuery={searchPositionQuery}
        setSearchPositionQuery={setSearchPositionQuery}
        filteredPositionUsers={filteredPositionUsers}
        handlePositionUserClick={handlePositionUserClick}
        positionUsers={positionUsers}
      />
    </div>
  );
};

export default ContactsFeature;
