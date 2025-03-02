import { Avatar, Box, Typography } from "@mui/material";

interface MessageProps {
  message: {
    isCurrentUser: boolean;
    sender: string;
    text: string;
    timestamp: string;
  }
}

const MessageItem = ({ message }: MessageProps) => (
  <Box
    className={`flex mb-4 ${
      message.isCurrentUser ? "justify-end" : "justify-start"
    }`}
    sx={{
      marginBottom: "16px",
      animation: "fadeIn 0.3s ease-in-out",
      "@keyframes fadeIn": {
        "0%": { opacity: 0, transform: "translateY(10px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
    }}
  >
    {!message.isCurrentUser && (
      <Avatar
        className="h-9 w-9 ml-2"
        sx={{
          bgcolor: "#5677BC",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          border: "2px solid #f1f5f9",
        }}
      >
        {message.sender.charAt(0)}
      </Avatar>
    )}
    <Box
      className={`max-w-[70%] p-3 rounded-2xl ${
        message.isCurrentUser ? "text-white" : "bg-white"
      }`}
      sx={{
        boxShadow: message.isCurrentUser
          ? "0 4px 12px rgba(86,119,188,0.2)"
          : "0 2px 10px rgba(0,0,0,0.05)",
        borderRadius: message.isCurrentUser
          ? "18px 4px 18px 18px"
          : "4px 18px 18px 18px",
        transition: "all 0.3s ease",
        padding: "12px 16px",
        background: message.isCurrentUser
          ? "linear-gradient(135deg, #5677BC 0%, #09193C 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: message.isCurrentUser
            ? "0 6px 16px rgba(86,119,188,0.25)"
            : "0 4px 14px rgba(0,0,0,0.08)",
        },
      }}
    >
      <Typography
        variant="body1"
        className="leading-relaxed"
        sx={{ fontWeight: 400 }}
      >
        {message.text}
      </Typography>
      <Typography
        variant="caption"
        className="block text-left mt-1"
        sx={{
          opacity: 0.7,
          fontSize: "0.7rem",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {message.timestamp}
        {message.isCurrentUser && (
          <span style={{ fontSize: "14px", marginRight: "2px" }}>✓✓</span>
        )}
      </Typography>
    </Box>
    {message.isCurrentUser && (
      <Avatar
        className="h-9 w-9 mr-2"
        sx={{
          bgcolor: "#5677BC",
          boxShadow: "0 2px 5px rgba(86,119,188,0.3)",
          border: "2px solid #f1f5f9",
        }}
      >
        {message.sender.charAt(0)}
      </Avatar>
    )}
  </Box>
);

export default MessageItem;
