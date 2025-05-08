import React from "react";
import { Box } from "@mui/material";
import MessageItem from "./chat.bubble";
import { ChatType } from "../../types";

interface MessageContentProps {
  messages: ChatType["SingleMessageType"][];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

// کامپوننت بخش محتوای پیام‌ها
const MessageContent: React.FC<MessageContentProps> = ({
  messages,
  messagesEndRef,
}) => {
  return (
    <Box
      className="flex-grow p-2 sm:p-4 overflow-y-auto"
      sx={{
        backgroundColor: "#f8fafc",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        padding: { xs: "10px", sm: "15px", md: "20px" },
      }}
    >
      {messages.length > 0 ? (
        messages.map((message: ChatType["SingleMessageType"]) => (
          <MessageItem key={message.id} message={message} />
        ))
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">
          هنوز پیامی ارسال نشده است. اولین پیام خود را ارسال کنید.
        </div>
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessageContent; 