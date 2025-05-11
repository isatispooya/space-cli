import { useQuery, UseQueryResult } from "@tanstack/react-query";
import profileService from "../services/profileServices";
import { AxiosError } from "axios";
import { ProfileType } from "../types";
// import { identifyUser } from "../../../utils/Clarity";

export const useProfile = (): UseQueryResult<ProfileType, AxiosError> => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.get,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    // onSettled: (data) => {
    //   if (data) {
    //     identifyUser({
    //       customId: data.uniqueIdentifier,
    //       friendlyName: data.first_name + " " + data.last_name,
    //     });
    //   }
    // }
  });
};
export default useProfile;
