import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { timeflowServices } from "../service";
import {
  AbsensePostType,
  LeaveParentPostType,
  LeavePostType,
  LeaveType,
  MissionParentPostType,
  MissionType,
  SeniorVerifyType,
  TimeflowVerifyType,
  UserLoginType,
  UsersTimeflowType,
} from "../types";
import { AxiosError } from "axios";
import { MissionPostType } from "../types";

const useTimeflow = {
  useGetUsersLogin: (): UseQueryResult<UserLoginType> => {
    return useQuery({
      queryKey: ["users-login"],
      queryFn: () => timeflowServices.getUsersLogin(),
    });
  },

  useUsersLogoutAccept: (): UseMutationResult<
    TimeflowVerifyType,
    AxiosError,
    { data: TimeflowVerifyType }
  > => {
    return useMutation({
      mutationKey: ["update-users-logout"],
      mutationFn: ({ data }: { data: TimeflowVerifyType }) => {
        // Ensure time_user is a string
        const formattedData = {
          ...data,
          time_user:
            typeof data.time_user === "string"
              ? data.time_user
              : data.time_user.toISOString(),
        };
        return timeflowServices.UsersLogoutAccept(formattedData);
      },  
    });
  },
  useUsersLogoutAcceptParent: (): UseMutationResult<
    SeniorVerifyType,
    AxiosError,
    { data: SeniorVerifyType; id: number }
  > => {
    return useMutation({
      mutationKey: ["update-users-logout-parent"],
      mutationFn: ({ data, id }: { data: SeniorVerifyType; id: number }) =>
        timeflowServices.UsersLogoutAcceptParent(data, id),
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

  useGetTimeflowDetails: (year: number, month: number): UseQueryResult<UserLoginType[]> => {
    return useQuery({
      queryKey: ["timeflow-details", year, month],
      queryFn: ({ queryKey }) => {
        const [, year, month] = queryKey.map((value) => parseInt(value as string, 10));
        return timeflowServices.getTimeflowDetails(year, month);
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
  useGetMission: (): UseQueryResult<MissionType> => {
    return useQuery({
      queryKey: ["mission-time-flow"],
      queryFn: () => timeflowServices.getMission(),
    });
  },
  useCreateMission: (): UseMutationResult<
    MissionPostType,
    AxiosError,
    MissionPostType
  > => {
    return useMutation({
      mutationKey: ["create-mission"],
      mutationFn: (data: MissionPostType) =>
        timeflowServices.createMission(data),
    });
  },
  useUpdateMission: (): UseMutationResult<
    MissionParentPostType,
    AxiosError,
    { data: MissionParentPostType; id: number }
  > => {
    return useMutation({
      mutationKey: ["update-mission"],
      mutationFn: ({ data, id }: { data: MissionParentPostType; id: number }) =>
        timeflowServices.updateMission(id, data),
    });
  },



  useGetLeave: (): UseQueryResult<LeaveType[]> => {
    return useQuery({
      queryKey: ["leave"],
      queryFn: () => timeflowServices.getLeave(),
    });
  },
  useCreateLeave: (): UseMutationResult<
    LeavePostType,
    AxiosError,
    LeavePostType
  > => {
    return useMutation({
      mutationKey: ["create-leave"],
      mutationFn: (data: LeavePostType) => timeflowServices.createLeave(data),
    });
  },
  useUpdateLeave: (): UseMutationResult<
    LeaveParentPostType,
    AxiosError,
    { data: LeaveParentPostType; id: number }
  > => {
    return useMutation({
      mutationKey: ["update-leave"],
      mutationFn: ({ data, id }: { data: LeaveParentPostType; id: number }) =>
        timeflowServices.updateLeave(id, data),
    });
  },
  useGetTimeflow: (): UseQueryResult<UsersTimeflowType[]> => {
    return useQuery({
      queryKey: ["timeflow"],
      queryFn: () => timeflowServices.getTimeflow(),
    });
  },
  usePostAbsence: (): UseMutationResult<
    AbsensePostType,
    AxiosError,
    AbsensePostType
  > => {
    return useMutation({
      mutationKey: ["post-absence"],
      mutationFn: (data: AbsensePostType) => timeflowServices.postAbsence(data),
    });
  },

  useGetUserAllTimeflow: ()=> {
    return useQuery({
      queryKey: ["user-all-timeflow"],
      queryFn: () => timeflowServices.getUserAllTimeflow(),
    });
  },
};

export default useTimeflow;
