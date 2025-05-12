import { server } from "@/api/server";
import { Box, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import defaultUserImage from "@/assets/pictures/user-286-128.png";

interface ChatHeaderPropsType {
  selectedUser: {
    name: string;
    profile_image?: string | null;
    avatar?: string | null;
  };
  onBackClick?: () => void;
  isFullUrl?: boolean;
}

const ChatHeader = ({ selectedUser }: ChatHeaderPropsType) => {
  console.log(selectedUser);

  const isFullUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const getImageUrl = () => {
    if (!selectedUser) return defaultUserImage;

    if (selectedUser.profile_image) {
      return isFullUrl(selectedUser.profile_image)
        ? selectedUser.profile_image
        : server + selectedUser.profile_image;
    }

    if (selectedUser.avatar) {
      return isFullUrl(selectedUser.avatar)
        ? selectedUser.avatar
        : server + selectedUser.avatar;
    }

    return defaultUserImage;
  };

  return (
    <Box
      className="text-white p-4 flex items-center justify-between"
      sx={{
        boxShadow: "0 2px 10px rgba(86,119,188,0.2)",
        background: "linear-gradient(135deg, #5677BC 0%, #02205F 100%)",
        padding: "16px 20px",
      }}
    >
      <div className="flex items-center">
        <Avatar
          className="ml-3"
          sx={{
            bgcolor: "#ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            width: 45,
            height: 45,
            border: "2px solid rgba(255,255,255,0.8)",
          }}
          src={getImageUrl()}
        >
          {!selectedUser?.profile_image && selectedUser?.name?.charAt(0)}
        </Avatar>
        <div>
          <Typography variant="h6" className="font-semibold">
            {selectedUser?.name || "گفتگوی پشتیبانی"}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            آنلاین | آخرین بازدید امروز ساعت ۱۰:۴۵
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default ChatHeader;
