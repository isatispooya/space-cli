import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { timeflowServices } from "../service";
import {
  SeniorVerifyType,
  TimeflowEditType,
  TimeflowVerifyType,
  UserLoginType,
  UsersTimeflowType,
} from "../types";
import { AxiosError } from "axios";
import { TimeflowVerifyReqType } from "../types/userstimeflow.type";

const useTimeflow = {
  useGetUsersLogin: (): UseQueryResult<UserLoginType> => {
    return useQuery({
      queryKey: ["users-login"],
      queryFn: () => timeflowServices.getUsersLogin(),
    });
  },
  useGetTimeflowSenior: (): UseQueryResult<UsersTimeflowType[]> => {
    return useQuery({
      queryKey: ["timeflow-senior"],
      queryFn: () => timeflowServices.getTimeflowSenior(),
    });
  },
  useUpdateTimeflowSenior: (): UseMutationResult<
    TimeflowVerifyReqType,
    AxiosError,
    { id: number; data: TimeflowVerifyReqType }
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ["update-timeflow-senior"],
      mutationFn: ({ id, data }: { id: number; data: TimeflowVerifyReqType }) =>
        timeflowServices.updateTimeflowSenior(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["timeflow-senior"] });
      },
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

  useUserTimeflow: (): UseMutationResult<
    TimeflowVerifyType,
    AxiosError,
    { data: TimeflowVerifyType }
  > => {
    return useMutation({
      mutationKey: ["user-timeflow"],
      mutationFn: ({ data }: { data: TimeflowVerifyType }) =>
        timeflowServices.UserTimeflowAccept(data),
    });
  },

  useGetTimeflowDetails: (): UseQueryResult<UserLoginType> => {
    return useQuery({
      queryKey: ["timeflow-details"],
      queryFn: () => {
        return timeflowServices.getTimeflowDetails();
      },
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

  useGetTimeflow: (): UseQueryResult<UsersTimeflowType[]> => {
    return useQuery({
      queryKey: ["timeflow"],
      queryFn: () => timeflowServices.getTimeflow(),
    });
  },

  useGetUserAllTimeflow: () => {
    return useQuery({
      queryKey: ["user-all-timeflow"],
      queryFn: () => timeflowServices.getUserAllTimeflow(),
    });
  },

  usePatchTimeflowEdit: (): UseMutationResult<
    TimeflowEditType,
    AxiosError,
    { data: TimeflowEditType; id: number }
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ["patch-timeflow-edit"],
      mutationFn: ({ data, id }: { data: TimeflowEditType; id: number }) =>
        timeflowServices.patchTimeflowEdit(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-all-timeflow"] });
      },
    });
  },
  useGetTimeFlowReport: (id: number, month?: number, year?: number) => {
    return useQuery({
      queryKey: ["time-flow-report", id, month, year],
      queryFn: () => timeflowServices.getTimeFlowReport(id, month, year),
    });
  },
};

export default useTimeflow;
