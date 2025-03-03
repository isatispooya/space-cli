import { useProfile } from "@/Modules/userManagment";
import useChat from "../../hooks/useChat";
import { ChatType } from "../../types";
import UserAvatar from "./contact.avatar";

const ContactsCard = ({
  userProfileData,
  selectedUserId,
  handleUserClick,
}: {
  userProfileData: ChatType["UserMessageType"][];
  selectedUserId: string | null | undefined;
  handleUserClick: (userId: string) => void;
}) => {


  const { mutate: updateSeen } = useChat.useUpdateSeen();
  const { data: messages } = useChat.useGetChat();
  const { data: profileData } = useProfile();

  const hasUnseenMessages = (userId: string) => {
    if (!messages || !profileData) return false;

    // Get current user's uniqueIdentifier
    const currentUserUniqueId = profileData.uniqueIdentifier;

    return messages.some(
      (message) =>
        // Check if message is for this user
        message.receiver === parseInt(userId) &&
        // Check if message is unseen
        !message.seen &&
        // Check if sender is NOT the current user
        message.sender_details?.uniqueIdentifier !== currentUserUniqueId
    );
  };

  const handleUserSelection = (userId: string) => {
    handleUserClick(userId);

    updateSeen({
      seen: true,
      sender_id: parseInt(userId),
    });
  };

  return (
    <>
      {userProfileData.map((user: ChatType["UserMessageType"]) => (
        <div
          key={user.id}
          className={`user-item py-2 sm:py-3 px-3 sm:px-4 border-b flex items-center cursor-pointer transition-all duration-300 ${
            selectedUserId === user.id
              ? "bg-[#5677BC]/20 border-r-4 border-r-[#5677BC]"
              : "hover:bg-gray-50"
          }`}
          onClick={() => handleUserSelection(user.id)}
        >
          <UserAvatar user={user} />
          <div className="user-info flex-1 min-w-0 mr-2">
            <div className="flex justify-between items-center">
              <div className="user-name font-semibold text-xs sm:text-sm truncate">
                {user.name}
                {hasUnseenMessages(user.id) && (
                  <span className="inline-block ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
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
                {hasUnseenMessages(user.id) && (
                  <span className="inline-block ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] rounded-full">
                    جدید
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactsCard;
