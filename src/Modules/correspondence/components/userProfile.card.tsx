import { ChatType } from "../types";
import UserAvatar from "./userAvatar.section";

const UserProfileCard = ({
  userProfileData,
  selectedUserId,
  handleUserClick,
}: {
  userProfileData: ChatType["UserMessageType"][];
  selectedUserId: string | null | undefined;
  handleUserClick: (userId: string) => void;
}) => {
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
    </>
  );
};

export default UserProfileCard;
