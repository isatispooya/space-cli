import { server } from "@/api";

// Using a more specific type instead of any
interface UserDataInterface {
  id: number | string;
  first_name?: string;
  last_name?: string;
  uniqueIdentifier?: string;
  profile_image?: string | null;
  online?: boolean;
  last_seen?: string | null;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
    profile_image?: string | null;
  };
  name?: string;
  mobile?: string;
  account_number?: string | null;
}

const ContactsList = ({
  position,
}: {
  position: UserDataInterface;
}) => {
  const firstName = position.first_name  || "";
  const lastName = position.last_name  || "";
  const profileImage = position.profile_image  || null;
  const uniqueId = position.uniqueIdentifier  || "";
  const isOnline = position.online || false;
  const positionName = position.name || "";
  
  return (
    <div className="p-3 rounded-lg flex items-center border-b border-gray-100">
      <div className="w-10 h-10 rounded-full bg-[#5677BC] text-white flex items-center justify-center overflow-hidden mr-3">
        {profileImage ? (
          <img
            src={server+profileImage}
            alt={firstName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{firstName[0]}</span>
        )}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-sm">{`${firstName} ${lastName}`}</div>
        <div className="text-xs text-gray-500 flex justify-between mt-1">
          <span>{uniqueId}</span>
          <span className="text-[#5677BC]">{positionName || (isOnline ? "آنلاین" : "آفلاین")}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
