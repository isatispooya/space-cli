import { server } from "@/api/server";
import { ChatType } from "@/Modules/messenger/types/chat.type";
import defaultUserImage from "@/assets/pictures/user-286-128.png";

const ContactAvatar = ({ user }: { user: ChatType["UserMessageType"] }) => {
  return (
    <>
      <div className="relative">
        <div className="avatar w-10 h-10 rounded-full bg-[#ffffff] text-white flex items-center justify-center mr-3">
          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt={user.name}
              className="w-full h-full rounded-full"
            />
          ) : user.avatar ? (
            <img
              src={server+user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full"
            />
          ) : (
            <img
              src={defaultUserImage}
              alt={user.name}
              className="w-full h-full rounded-full"
            />
          )}
        </div>
        {user.isOnline && (
          <div className="absolute bottom-0 right-3 w-2.5 h-2.5 bg-[#FA2566] rounded-full border-2 border-white"></div>
        )}
      </div>
    </>
  );
};

export default ContactAvatar;
