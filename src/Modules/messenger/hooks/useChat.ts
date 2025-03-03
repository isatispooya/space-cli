import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { chatService } from "../services";
import { ChatType } from "../types";
import { AxiosError } from "axios";

const useChat = {
  useGetChat: (): UseQueryResult<ChatType["MessagesType"][]> => {
    return useQuery({
      queryKey: ["chat"],
      queryFn: () => chatService.get(),
      refetchInterval: 10000,
    });
  },
  useGetUsersByPosition: () => {
    return useQuery({
      queryKey: ["users"],
      queryFn: () => chatService.getUsersByPosition(),
    });
  },
  useGetChatById: (id: number): UseQueryResult<ChatType> => {
    return useQuery({
      queryKey: ["chat", id],
      queryFn: () => chatService.getById(id),
    });
  },
  useCreateChat: (): UseMutationResult<
    ChatType["postMessegeType"],
    AxiosError,
    ChatType["postMessegeType"]
  > => {
    return useMutation({
      mutationKey: ["chat"],
      mutationFn: (data: ChatType["postMessegeType"]) => chatService.post(data),
    });
  },
  useAttachment: (): UseMutationResult<any, AxiosError, any> => {
    return useMutation({
      mutationKey: ["attachment"],
      mutationFn: async (data: any) => {
        // Create a new FormData object
        const formData = new FormData();

        // Append data to FormData
        if (typeof data === "object" && data !== null) {
          Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
          });
        } else {
          formData.append("file", data);
        }

        // Pass FormData to the postAttachment function
        return chatService.postAttachment(formData);
      },
    });
  },
  useUpdateChat: (
    id: number
  ): UseMutationResult<
    ChatType["postMessegeType"],
    AxiosError,
    ChatType["postMessegeType"]
  > => {
    return useMutation({
      mutationKey: ["chat", id],
      mutationFn: (data: ChatType["postMessegeType"]) =>
        chatService.patch(id, data),
    });
  },
  useUpdateSeen: (): UseMutationResult<
    ChatType["postSeenType"],
    AxiosError,
    ChatType["postSeenType"]
  > => {
    return useMutation({
      mutationKey: ["chat"],
      mutationFn: (data: ChatType["postSeenType"]) =>
        chatService.patchSeen(data.sender_id, data),
    });
  },
};

export default useChat;
