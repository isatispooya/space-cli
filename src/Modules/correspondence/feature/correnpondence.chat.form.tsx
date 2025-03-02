import { useState, useEffect, useRef } from "react";
import { Paper, Box, Divider } from "@mui/material";
import { FormikHelpers } from "formik";
import useChat from "../hooks/useChat";
import ChatHeader from "../components/chatHeader";
import MessageItem from "../components/itemMessage";
import ChatInput from "../components/chatInputs";
import useProfile from "@/Modules/userManagment/hooks/useProfile";
import { server } from "@/api/server";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
  createdAt: number;
}

interface CorrespondenceTypes {
  content: string;
  receiver?: string;
  message?: string;
}

interface CorrespondenceChatFormProps {
  onSubmit: (
    values: CorrespondenceTypes,
    actions: FormikHelpers<CorrespondenceTypes>
  ) => void;
  loading: boolean;
  selectedUser?: { id: string; name: string; avatar?: string; };
  onBackClick?: () => void;
}

const CorrespondenceChatForm: React.FC<CorrespondenceChatFormProps> = ({
  onSubmit,
  loading,
  selectedUser,
  onBackClick,
}) => {
  const { data: chatData } = useChat.useGetChat();
  const { mutate: createChat } = useChat.useCreateChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: profileData } = useProfile();


  console.log(selectedUser);
  

  useEffect(() => {
    if (chatData && Array.isArray(chatData) && profileData) {
      let formattedMessages = chatData
        .map((msg) => ({
          id: msg.id,
          text: msg.message,
          sender: `${msg.sender_details.first_name} ${msg.sender_details.last_name}`,
          timestamp: new Date(msg.created_at).toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isCurrentUser: msg.sender_details.id === profileData?.id,
          createdAt: new Date(msg.created_at).getTime(),
        }))
        .sort((a, b) => a.createdAt - b.createdAt);
      
      if (selectedUser && selectedUser.id) {
        formattedMessages = chatData
          .filter(msg => 
            (msg.sender_details.id.toString() === selectedUser.id && msg.receiver_details.id === profileData?.id) || 
            (msg.receiver_details.id.toString() === selectedUser.id && msg.sender_details.id === profileData?.id)
          )
          .map((msg) => ({
            id: msg.id,
            text: msg.message,
            sender: `${msg.sender_details.first_name} ${msg.sender_details.last_name}`,
            timestamp: new Date(msg.created_at).toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isCurrentUser: msg.sender_details.id === profileData?.id,
            createdAt: new Date(msg.created_at).getTime(),
          }))
          .sort((a, b) => a.createdAt - b.createdAt);
      }

      setMessages(formattedMessages);
    }
  }, [chatData, profileData, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || loading) return;

    const newMsg: Message = {
      id: messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1,
      text: newMessage,
      sender: "کاربر",
      timestamp: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCurrentUser: true,
      createdAt: new Date().getTime(),
    };

    setMessages([...messages, newMsg]);

    const messageData: CorrespondenceTypes = {
      content: newMessage,
      receiver: selectedUser?.id,
      message: newMessage,
    };

    createChat(messageData, {
      onSuccess: () => {
        setNewMessage("");
      },
    });

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
      <ChatHeader
        selectedUser={selectedUser ? { 
          name: selectedUser.name,
          profile_image: selectedUser.profile_image || null,
        } : { name: "" }}
        onBackClick={onBackClick}
        isFullUrl={true}
      />
      <Divider />
      {selectedUser ? (
        <>
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
              messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                هنوز پیامی ارسال نشده است. اولین پیام خود را ارسال کنید.
              </div>
            )}
            <div ref={messagesEndRef} />
          </Box>
          <Divider />
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            loading={loading}
          />
        </>
      ) : (
        <div className="flex-grow flex justify-center items-center bg-gray-50 text-gray-500">
          لطفاً یک کاربر را برای شروع گفتگو انتخاب کنید
        </div>
      )}
    </Paper>
  );
};

export default CorrespondenceChatForm;
