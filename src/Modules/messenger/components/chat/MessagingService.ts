import { ChatType, ProfileDataType, SelectedUserType, ChatDataType } from "../../types";

export class MessagingService {
  static createAttachmentMessage(
    messageText: string,
    files: File[],
    messages: ChatType["SingleMessageType"][],
    profileData: ProfileDataType
  ): ChatType["SingleMessageType"] {
    return {
      id: messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 999 : 999,
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
      attachmentName: files[0]?.name,
      attachment: "در حال آپلود...",
      attachmentType: files[0]?.name.split(".").pop()?.toLowerCase(),
      attachmentSize: files[0]?.size,
      seen: false,
      isDeleted: false,
    };
  }

  static createTextMessage(
    messageText: string,
    messages: ChatType["SingleMessageType"][],
    profileData: ProfileDataType,
    selectedUser: SelectedUserType
  ): ChatType["SingleMessageType"] {
    return {
      id: messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1,
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
              last_name: selectedUser.name.split(" ").slice(1).join(" ") || "",
              uniqueIdentifier: "",
              profile_image: selectedUser.avatar || null,
            }
          : undefined,
      senderId: profileData?.id,
      receiverId: selectedUser?.id ? parseInt(selectedUser.id) : undefined,
    };
  }

  static createMessageData(
    messageText: string,
    selectedUser: SelectedUserType,
    attachId: number = 0
  ): ChatType["postMessegeType"] {
    return {
      content: messageText,
      receiver: selectedUser?.id ? parseInt(selectedUser.id) : 0,
      message: messageText,
      attach: attachId,
    };
  }

  static processMessages(
    chatData: ChatDataType[],
    profileData: ProfileDataType,
    selectedUser: SelectedUserType | null
  ): ChatType["SingleMessageType"][] {
    if (!(chatData && Array.isArray(chatData) && profileData)) return [];

    let formattedMessages = chatData
      .map(this.mapChatDataToMessage(profileData))
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
        .map(this.mapChatDataToMessage(profileData))
        .sort((a, b) => a.createdAt - b.createdAt);
    }

    return formattedMessages;
  }

  private static mapChatDataToMessage = (profileData: ProfileDataType) => (msg: ChatDataType): ChatType["SingleMessageType"] => ({
    id: msg.id,
    text: msg.message,
    sender: `${msg.sender_details.first_name} ${msg.sender_details.last_name}`,
    timestamp: new Date(msg.created_at).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    isCurrentUser: msg.sender_details.id === profileData?.id,
    createdAt: new Date(msg.created_at).getTime(),
    attachment: msg.attachment || (msg.attach_details ? msg.attach_details.file : null),
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
  });
} 