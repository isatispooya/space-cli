import { Box, Typography } from "@mui/material";

import { Avatar } from "@mui/material";

const ChatHeader = ({ selectedUser }: { selectedUser: { name: string } }) => (
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
        {selectedUser?.name.charAt(0) || "پ"}
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
