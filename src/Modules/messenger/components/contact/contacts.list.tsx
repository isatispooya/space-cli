import { ChatType } from "../../types";

const ContactsList = ({
  position,
}: {
  position: ChatType["UserPositionType"];
}) => {
  const { user } = position;

  return (
    <div className="p-3 rounded-lg flex items-center border-b border-gray-100">
      <div className="w-10 h-10 rounded-full bg-[#5677BC] text-white flex items-center justify-center overflow-hidden mr-3">
        {user.profile_image ? (
          <img
            src={user.profile_image}
            alt={user.first_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{user.first_name[0]}</span>
        )}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-sm">{`${user.first_name} ${user.last_name}`}</div>
        <div className="text-xs text-gray-500 flex justify-between mt-1">
          <span>{user.uniqueIdentifier}</span>
          <span className="text-[#5677BC]">{position.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
