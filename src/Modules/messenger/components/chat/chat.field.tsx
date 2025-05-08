import { useState, useEffect, useRef } from "react";
import { Paper, Box, Divider } from "@mui/material";
import { FormikHelpers } from "formik";
import useChat from "../../hooks/useChat";
import ChatHeader from "./chat.header";
import MessageItem from "./chat.bubble";
import ChatInput from "./chat.inputs";
import useProfile from "@/Modules/userManagment/hooks/useProfile";
import { ChatType } from "../../types";

const MessageField: React.FC<ChatType["ChatFormProps"]> = ({
  onSubmit,
  loading,
  selectedUser,
  onBackClick,
}) => {
  const { data: chatData, refetch } = useChat.useGetChat();
  const { mutate: createChat } = useChat.useCreateChat();
  const [messages, setMessages] = useState<ChatType["SingleMessageType"][]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: profileData } = useProfile();
  const { mutate: uploadAttachment } = useChat.useAttachment();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatData && Array.isArray(chatData) && profileData) {
      let formattedMessages = chatData
        .map((msg) => {
          return {
            id: msg.id,
            text: msg.message,
            sender: `${msg.sender_details.first_name} ${msg.sender_details.last_name}`,
            timestamp: new Date(msg.created_at).toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isCurrentUser: msg.sender_details.id === profileData?.id,
            createdAt: new Date(msg.created_at).getTime(),
            attachment:
              msg.attachment ||
              (msg.attach_details ? msg.attach_details.file : null),
            attachmentName: msg.attachment
              ? msg.attachment.split("/").pop()
              : msg.attach_details
              ? msg.attach_details.name
              : null,
            attachmentType: msg.attachment
              ? msg.attachment.split(".").pop()?.toLowerCase()
              : msg.attach_details
              ? msg.attach_details.name.split(".").pop()?.toLowerCase()
              : null,
            attachmentSize: msg.attach_details ? msg.attach_details.size : null,
            senderDetails: msg.sender_details,
            receiverDetails: msg.receiver_details,
            seen: msg.seen || false,
            isDeleted: msg.is_deleted || false,
            senderId: msg.sender,
            receiverId: msg.receiver,
            attachId: msg.attach ? Number(msg.attach) : null,
            attachDetails: msg.attach_details,
          };
        })
        .sort((a, b) => a.createdAt - b.createdAt);

      if (selectedUser && selectedUser.id) {
        formattedMessages = chatData
          .filter(
            (msg) =>
              (msg.sender_details.id.toString() === selectedUser.id &&
                msg.receiver_details.id === profileData?.id) ||
              (msg.receiver_details.id.toString() === selectedUser.id &&
                msg.sender_details.id === profileData?.id)
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
            attachment:
              msg.attachment ||
              (msg.attach_details ? msg.attach_details.file : null),
            attachmentName: msg.attachment
              ? msg.attachment.split("/").pop()
              : msg.attach_details
              ? msg.attach_details.name
              : null,
            attachmentType: msg.attachment
              ? msg.attachment.split(".").pop()?.toLowerCase()
              : msg.attach_details
              ? msg.attach_details.name.split(".").pop()?.toLowerCase()
              : null,
            attachmentSize: msg.attach_details ? msg.attach_details.size : null,
            senderDetails: msg.sender_details,
            receiverDetails: msg.receiver_details,
            seen: msg.seen || false,
            isDeleted: msg.is_deleted || false,
            senderId: msg.sender,
            receiverId: msg.receiver,
            attachId: msg.attach ? Number(msg.attach) : null,
            attachDetails: msg.attach_details,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSendMessage = () => {
    if ((newMessage.trim() === "" && files.length === 0) || loading) return;

    const messageText =
      newMessage.trim() || (files.length > 0 ? "فایل پیوست" : "");

    if (files.length > 0) {
      const formData = new FormData();

      formData.append("message", messageText);
      formData.append("receiver", selectedUser?.id ? selectedUser.id : "0");
      formData.append("sender", profileData?.id.toString() || "0");

      files.forEach((file) => {
        formData.append("file", file);
        formData.append(`name`, file.name);
      });

      const temporaryMsg: ChatType["SingleMessageType"] = {
        id:
          messages.length > 0
            ? Math.max(...messages.map((m) => m.id)) + 999
            : 999,
        text: messageText,
        sender: profileData
          ? `${profileData.first_name} ${profileData.last_name}`
          : "کاربر",
        timestamp: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isCurrentUser: true,
        createdAt: new Date().getTime(),
        attachmentName: files[0].name,
        attachment: "در حال آپلود...",
        attachmentType: files[0].name.split(".").pop()?.toLowerCase(),
        attachmentSize: files[0].size,
        seen: false,
        isDeleted: false,
      };

      setMessages([...messages, temporaryMsg]);
      scrollToBottom();

      uploadAttachment(formData, {
        onSuccess: (response) => {
          if (response && response.id) {
            const messageData: ChatType["postMessegeType"] = {
              content: messageText,
              receiver: selectedUser?.id ? parseInt(selectedUser.id) : 0,
              message: messageText,
              attach: response.id,
            };

            createChat(messageData, {
              onSuccess: () => {
                setNewMessage("");
                refetch();
              },
              onError: (error) => {
                console.error("خطا در ارسال پیام:", error);
                setMessages(messages.filter((m) => m.id !== temporaryMsg.id));
              },
            });
          }

          setFiles([]);
          setNewMessage("");
        },
        onError: (error) => {
          console.error("خطا در آپلود فایل:", error);
          setMessages(messages.filter((m) => m.id !== temporaryMsg.id));
        },
      });
    } else if (messageText) {
      const newMsg: ChatType["SingleMessageType"] = {
        id:
          messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1,
        text: messageText,
        sender: profileData
          ? `${profileData.first_name} ${profileData.last_name}`
          : "کاربر",
        timestamp: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isCurrentUser: true,
        createdAt: new Date().getTime(),
        attachment: null,
        seen: false,
        isDeleted: false,
        senderDetails: profileData
          ? {
              id: profileData.id,
              first_name: profileData.first_name,
              last_name: profileData.last_name,
              uniqueIdentifier: profileData.uniqueIdentifier,
              profile_image: profileData.profile_image,
            }
          : undefined,
        receiverDetails:
          selectedUser && profileData
            ? {
                id: parseInt(selectedUser.id),
                first_name: selectedUser.name.split(" ")[0] || "",
                last_name:
                  selectedUser.name.split(" ").slice(1).join(" ") || "",
                uniqueIdentifier: "",
                profile_image: selectedUser.avatar || null,
              }
            : undefined,
        senderId: profileData?.id,
        receiverId: selectedUser?.id ? parseInt(selectedUser.id) : undefined,
      };

      setMessages([...messages, newMsg]);

      const messageData: ChatType["postMessegeType"] = {
        content: messageText,
        receiver: selectedUser?.id ? parseInt(selectedUser.id) : 0,
        message: messageText,
        attach: 0,
      };

      createChat(messageData, {
        onSuccess: () => {
          setNewMessage("");
          refetch();
        },
        onError: (error) => {
          console.error("خطا در ارسال پیام:", error);
          setMessages(messages.filter((m) => m.id !== newMsg.id));
        },
      });

      onSubmit(messageData, {
        resetForm: () => setNewMessage(""),
      } as FormikHelpers<ChatType["postMessegeType"]>);
    }

    scrollToBottom();
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
        selectedUser={selectedUser ? { name: selectedUser.name } : { name: "" }}
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
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {files.length > 0 && (
            <Box
              className="p-2 bg-blue-50 flex flex-wrap gap-2"
              sx={{
                borderTop: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              {files.map((file, index) => (
                <div
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs flex items-center"
                >
                  {file.name}
                  <button
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    onClick={() =>
                      setFiles(files.filter((_, i) => i !== index))
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
            </Box>
          )}
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            loading={loading}
            handleFileUpload={handleFileUpload}
            filesCount={files.length}
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

export default MessageField;
