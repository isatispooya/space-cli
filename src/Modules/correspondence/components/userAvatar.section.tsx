import { ChatType } from "../types";

const UserAvatar = ({ user }: { user: ChatType["UserMessageType"] }) => {
  return (
    <>
      <div className="relative">
        <div className="avatar w-10 h-10 rounded-full bg-[#5677BC] text-white flex items-center justify-center mr-3">
          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt={user.name}
              className="w-full h-full rounded-full"
            />
          ) : user.avatar ? (
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
    </>
  );
};

export default UserAvatar;
