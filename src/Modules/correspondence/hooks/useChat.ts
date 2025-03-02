import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";
import { chatService } from "../services";
import { ChatType } from "../types";

const useChat = {
  useGetChat: (): UseQueryResult<ChatType[]> => {
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
  useCreateChat: () => {
    return useMutation({
      mutationKey: ["chat"],
      mutationFn: (data: any) => chatService.post(data),
    });
  },
  useUpdateChat: (id: number) => {
    return useMutation({
      mutationKey: ["chat", id],
      mutationFn: (data: any) => chatService.patch(id, data),
    });
  },
};

export default useChat;
