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
  useGetUserOfPosition: (): UseQueryResult<ChatType["MessagesType"][]> => {
    return useQuery({
      queryKey: ["users"],
      queryFn: () => chatService.getUserOfPosition(),
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
        if (data instanceof FormData) {
          return chatService.postAttachment(data);
        }

        const formData = new FormData();

        if (typeof data === "object" && data !== null) {
          Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
              data[key].forEach((item: any) => {
                formData.append(key, item);
              });
            } else {
              formData.append(key, data[key]);
            }
          });
        } else {
          formData.append("file", data);
        }

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
