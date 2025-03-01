import { useState, useEffect, useRef } from "react";
import {
  Avatar,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import { FormikHelpers } from "formik";
import { CorrespondenceTypes } from "../types";
import useChat from "../hooks/useChat";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface CorrespondenceChatFormProps {
  onSubmit: (
    values: CorrespondenceTypes,
    actions: FormikHelpers<CorrespondenceTypes>
  ) => void;
  loading: boolean;
  selectedUser?: { id: string; name: string; avatar?: string };
}

const CorrespondenceChatForm: React.FC<CorrespondenceChatFormProps> = ({
  onSubmit,
  loading,
  selectedUser,
}) => {
  const { data: message } = useChat.useGetChat();

  console.log(message);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "سلام، چطور می‌توانم کمک کنم؟",
      sender: "پشتیبانی",
      timestamp: "10:30",
      isCurrentUser: false,
    },
    {
      id: 2,
      text: "من درباره مکاتبه شماره 1234 سوال داشتم",
      sender: "کاربر",
      timestamp: "10:32",
      isCurrentUser: true,
    },
    {
      id: 3,
      text: "بله، بفرمایید. چه سوالی دارید؟",
      sender: "پشتیبانی",
      timestamp: "10:33",
      isCurrentUser: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || loading) return;

    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "کاربر",
      timestamp: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCurrentUser: true,
    };

    setMessages([...messages, newMsg]);

    const messageData: CorrespondenceTypes = {
      content: newMessage,
      sender: "کاربر",
    };

    onSubmit(messageData, {
      resetForm: () => setNewMessage(""),
    } as FormikHelpers<CorrespondenceTypes>);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper
      elevation={3}
      className="w-full h-full flex flex-col rounded-lg overflow-hidden"
      dir="rtl"
    >
      <Box className="bg-gradient-to-r from-[#29D2C7] to-[#20B2AA] text-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <Avatar className="ml-3" sx={{ bgcolor: "#1a8f88" }}>
            {selectedUser?.name.charAt(0) || "پ"}
          </Avatar>
          <Typography variant="h6" className="font-semibold">
            {selectedUser?.name || "گفتگوی پشتیبانی"}
          </Typography>
        </div>
      </Box>

      <Divider />

      <Box className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <Box
            key={message.id}
            className={`flex mb-4 ${
              message.isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            {!message.isCurrentUser && (
              <Avatar className="h-9 w-9 ml-2" sx={{ bgcolor: "#1a8f88" }}>
                {message.sender.charAt(0)}
              </Avatar>
            )}
            <Box
              className={`max-w-[70%] p-3 rounded-2xl ${
                message.isCurrentUser
                  ? "bg-gradient-to-r from-[#0088cc] to-[#0099dd] text-white shadow-md"
                  : "bg-white shadow-md border border-gray-100"
              }`}
            >
              <Typography variant="body1" className="leading-relaxed">
                {message.text}
              </Typography>
              <Typography
                variant="caption"
                className="block text-left mt-1 opacity-75"
              >
                {message.timestamp}
              </Typography>
            </Box>
            {message.isCurrentUser && (
              <Avatar className="h-9 w-9 mr-2" sx={{ bgcolor: "#0088cc" }}>
                {message.sender.charAt(0)}
              </Avatar>
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Divider />

      <Box className="p-4 bg-white flex items-center">
        <Button
          variant="text"
          className="ml-2 text-gray-600 hover:bg-gray-100 rounded-full p-2"
          disabled={loading}
        >
          <FaPaperclip className="text-gray-500" />
        </Button>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="پیام خود را بنویسید..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
          disabled={loading}
          className="rounded-full mx-2"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              "&:hover fieldset": {
                borderColor: "#29D2C7",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#29D2C7",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <Button
                variant="text"
                className="text-gray-600 hover:bg-gray-100 rounded-full"
                disabled={loading}
              >
                <span className="material-icons">sentiment_satisfied_alt</span>
              </Button>
            ),
          }}
        />
        <Button
          variant="contained"
          className="rounded-full w-12 h-12 min-w-0 flex items-center justify-center"
          sx={{
            bgcolor: "#0088cc",
            "&:hover": {
              bgcolor: "#0077b3",
            },
            boxShadow: "0 3px 5px rgba(0,136,204,0.3)",
          }}
          onClick={handleSendMessage}
          disabled={newMessage.trim() === "" || loading}
        >
          {loading ? "..." : <FaPaperPlane className="text-sm" />}
        </Button>
      </Box>
    </Paper>
  );
};

export default CorrespondenceChatForm;
