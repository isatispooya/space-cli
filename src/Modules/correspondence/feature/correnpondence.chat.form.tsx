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
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Box
        className="bg-gradient-to-r from-[#29D2C7] to-[#20B2AA] text-white p-4 flex items-center justify-between"
        sx={{
          boxShadow: "0 2px 10px rgba(32,178,170,0.2)",
          background: "linear-gradient(135deg, #29D2C7 0%, #0088cc 100%)",
          padding: "16px 20px",
        }}
      >
        <div className="flex items-center">
          <Avatar
            className="ml-3"
            sx={{
              bgcolor: "#1a8f88",
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
      <Divider />
      <Box
        className="flex-grow p-4 overflow-y-auto"
        sx={{
          backgroundColor: "#f8fafc",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          padding: "20px",
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
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
                  bgcolor: "#1a8f88",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  border: "2px solid #f1f5f9",
                }}
              >
                {message.sender.charAt(0)}
              </Avatar>
            )}
            <Box
              className={`max-w-[70%] p-3 rounded-2xl ${
                message.isCurrentUser
                  ? "bg-gradient-to-r from-[#0088cc] to-[#0099dd] text-white"
                  : "bg-white"
              }`}
              sx={{
                boxShadow: message.isCurrentUser
                  ? "0 4px 12px rgba(0,136,204,0.2)"
                  : "0 2px 10px rgba(0,0,0,0.05)",
                borderRadius: message.isCurrentUser
                  ? "18px 4px 18px 18px"
                  : "4px 18px 18px 18px",
                transition: "all 0.3s ease",
                padding: "12px 16px",
                background: message.isCurrentUser
                  ? "linear-gradient(135deg, #0088cc 0%, #0077b3 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: message.isCurrentUser
                    ? "0 6px 16px rgba(0,136,204,0.25)"
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
                  <span style={{ fontSize: "14px", marginRight: "2px" }}>
                    ✓✓
                  </span>
                )}
              </Typography>
            </Box>
            {message.isCurrentUser && (
              <Avatar
                className="h-9 w-9 mr-2"
                sx={{
                  bgcolor: "#0088cc",
                  boxShadow: "0 2px 5px rgba(0,136,204,0.3)",
                  border: "2px solid #f1f5f9",
                }}
              >
                {message.sender.charAt(0)}
              </Avatar>
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Divider />
      <Box
        className="p-4 bg-gray-100 flex items-center"
        sx={{
          boxShadow: "0 -2px 10px rgba(0,0,0,0.03)",
          backgroundColor: "#f1f5f9",
          padding: "12px 16px",
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Button
          variant="text"
          className="ml-2 text-gray-600 hover:bg-gray-100 rounded-full p-2"
          disabled={loading}
          sx={{
            minWidth: "40px",
            height: "40px",
            borderRadius: "50%",
            transition: "all 0.2s ease",
            color: "#29D2C7",
            "&:hover": {
              backgroundColor: "rgba(41, 210, 199, 0.1)",
              transform: "rotate(15deg)",
            },
          }}
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
          className="mx-2"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              padding: "4px 8px",
              transition: "all 0.3s ease",
              backgroundColor: "white",
              "&:hover fieldset": {
                borderColor: "#29D2C7",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#29D2C7",
                boxShadow: "0 0 0 3px rgba(41, 210, 199, 0.1)",
              },
            },
            "& .MuiInputBase-input": {
              padding: "12px 16px",
              fontSize: "0.95rem",
            },
          }}
          InputProps={{
            endAdornment: (
              <Button
                variant="text"
                className="text-gray-600 rounded-full"
                disabled={loading}
                sx={{
                  minWidth: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  color: "#29D2C7",
                  "&:hover": {
                    backgroundColor: "rgba(41, 210, 199, 0.1)",
                  },
                }}
              >
                <span className="material-icons">sentiment_satisfied_alt</span>
              </Button>
            ),
          }}
        />
        <Button
          variant="contained"
          className="rounded-full flex items-center justify-center"
          sx={{
            bgcolor: "#0088cc",
            width: "48px",
            height: "48px",
            minWidth: "48px",
            borderRadius: "50%",
            "&:hover": {
              bgcolor: "#0077b3",
              transform: "translateY(-2px) scale(1.05)",
            },
            boxShadow: "0 4px 10px rgba(0,136,204,0.3)",
            transition: "all 0.2s ease",
          }}
          onClick={handleSendMessage}
          disabled={newMessage.trim() === "" || loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FaPaperPlane className="text-sm" />
          )}
        </Button>
      </Box>
    </Paper>
  );
};

export default CorrespondenceChatForm;
