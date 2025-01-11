import { useQuery, UseQueryResult } from "@tanstack/react-query";
import profileService from "../services/profileServices";
import { AxiosError } from "axios";
import { ProfileTypes } from "../types";

export const useProfile = (): UseQueryResult<ProfileTypes, AxiosError> => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.get,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};
export default useProfile;
