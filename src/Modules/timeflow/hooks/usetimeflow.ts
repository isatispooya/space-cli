import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { timeflowServices } from "../service";
import { SeniorVerifyType, TimeflowVerifyType, UserLoginType } from "../types";
import { AxiosError } from "axios";

const useTimeflow = {
  useGetUsersLogin: (): UseQueryResult<UserLoginType> => {
    return useQuery({
      queryKey: ["users-login"],
      queryFn: () => timeflowServices.getUsersLogin(),
    });
  },
  useGetUsersLogout: () => {
    return useQuery({
      queryKey: ["users-logout"],
      queryFn: () => timeflowServices.getUsersLogout(),
    });
  },
  useUserTimeflowAccept: (): UseMutationResult<
    TimeflowVerifyType,
    AxiosError,
    { data: TimeflowVerifyType; id: number }
  > => {
    return useMutation({
      mutationKey: ["user-timeflow-accept"],
      mutationFn: ({ data, id }: { data: TimeflowVerifyType; id: number }) =>
        timeflowServices.updateUserTimeflowAccept(data, id),
    });
  },
  useUpdateUsersLoginByParent: (): UseMutationResult<
    SeniorVerifyType,
    AxiosError,
    { data: SeniorVerifyType; id: number }
  > => {
    return useMutation({
      mutationKey: ["update-users-login-by-parent"],
      mutationFn: ({ data, id }: { data: SeniorVerifyType; id: number }) =>
        timeflowServices.updateUsersLoginByParent(data, id),
    });
  },
  useGetMissions: () => {
    return useQuery({
      queryKey: ["user_missions"],
      queryFn: () => timeflowServices.getMissions(),
    });
  },
  usePostMissions: () => {
    return useMutation({
      mutationKey: ["post_missions"],
      mutationFn: (data: any) => timeflowServices.postMissions(data),
    });
  },
};

export default useTimeflow;
