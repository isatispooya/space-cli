import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../service";

interface NotificationData {
  id: number;
  message: string;
  date: string;
  isRead: boolean;
}

const useCorrespondencesData = () => {
  return useQuery<NotificationData[]>({
    queryKey: ["notifications"],
    queryFn: notificationService.get,
  });
};

const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => notificationService.put(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export { useCorrespondencesData, useMarkAsRead };
