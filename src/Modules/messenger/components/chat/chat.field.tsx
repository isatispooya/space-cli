import { useState, useEffect, useRef } from "react";
import { Paper, Divider } from "@mui/material";
import { FormikHelpers } from "formik";
import useChat from "../../hooks/useChat";
import ChatHeader from "./chat.header";
import ChatInput from "./chat.inputs";
import useProfile from "@/Modules/userManagment/hooks/useProfile";
import {
  ChatType,
  ProfileDataType,
  SelectedUserType,
  ChatDataType,
} from "../../types";
import FileList from "./FileList";
import MessageContent from "./MessageContent";
import EmptyState from "./EmptyState";
import { MessagingService } from "./MessagingService";



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
      const formattedMessages = MessagingService.processMessages(
        chatData as ChatDataType[],
        profileData as ProfileDataType,
        selectedUser as SelectedUserType
      );
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

  const sendMessageWithAttachment = (messageText: string) => {
    const formData = new FormData();

    formData.append("message", messageText);
    formData.append("receiver", selectedUser?.id ? selectedUser.id : "0");
    formData.append("sender", profileData?.id.toString() || "0");

    files.forEach((file) => {
      formData.append("file", file);
      formData.append(`name`, file.name);
    });

    const temporaryMsg = MessagingService.createAttachmentMessage(
      messageText,
      files,
      messages,
      profileData as ProfileDataType
    );

    setMessages([...messages, temporaryMsg]);
    scrollToBottom();

    uploadAttachment(formData, {
      onSuccess: (response: { id: number }) => {
        if (response && response.id) {
          const messageData = MessagingService.createMessageData(
            messageText,
            selectedUser as SelectedUserType,
            Number(response.id)
          );

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
  };

  // ارسال پیام بدون فایل
  const sendTextMessage = (messageText: string) => {
    const newMsg = MessagingService.createTextMessage(
      messageText,
      messages,
      profileData as ProfileDataType,
      selectedUser as SelectedUserType
    );

    setMessages([...messages, newMsg]);

    const messageData = MessagingService.createMessageData(
      messageText,
      selectedUser as SelectedUserType
    );

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
  };

  const handleSendMessage = () => {
    if ((newMessage.trim() === "" && files.length === 0) || loading) return;

    const messageText =
      newMessage.trim() || (files.length > 0 ? "فایل پیوست" : "");

    if (files.length > 0) {
      sendMessageWithAttachment(messageText);
    } else if (messageText) {
      sendTextMessage(messageText);
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
        selectedUser={
          selectedUser
            ? {
                name: selectedUser.name,
                avatar: selectedUser.avatar,
                profile_image: selectedUser.profile_image,
              }
            : { name: "" }
        }
        onBackClick={onBackClick}
        isFullUrl={true}
      />
      <Divider />

      {selectedUser ? (
        <>
          <MessageContent messages={messages} messagesEndRef={messagesEndRef} />
          <Divider />

          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <FileList files={files} setFiles={setFiles} />

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
        <EmptyState />
      )}
    </Paper>
  );
};

export default MessageField;
