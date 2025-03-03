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
