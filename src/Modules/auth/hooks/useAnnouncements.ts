import { useQuery } from "@tanstack/react-query";
import { announcements } from "../services";

const useAnnouncements = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: announcements,
  });
};

export default useAnnouncements;
