import { useQuery } from "@tanstack/react-query";
import profileService from "../services/profileServices";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.get,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};
export default useProfile;
