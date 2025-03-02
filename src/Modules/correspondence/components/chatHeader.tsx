import { server } from "@/api/server";
import { Box, Typography } from "@mui/material";

import { Avatar } from "@mui/material";

interface ChatHeaderProps {
  selectedUser: {
    name: string;
    profile_image?: string | null;
  };
  onBackClick?: () => void;
  isFullUrl?: boolean;
}

const ChatHeader = ({ selectedUser }: ChatHeaderProps) => (
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
          bgcolor: "#008282",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          width: 45,
          height: 45,
          border: "2px solid rgba(255,255,255,0.8)",
        }}
      >
        {selectedUser?.profile_image ? (
          <img
            src={server + selectedUser.profile_image}
            alt={selectedUser.name}
            className="w-full h-full rounded-full"
          />
        ) : (
          selectedUser?.name.charAt(0)
        )}
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

export default ChatHeader;
