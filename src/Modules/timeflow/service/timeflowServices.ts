import { api } from "../../../api";
import {
  LeaveParentPostType,
  LeavePostType,
  MissionParentPostType,
  MissionType,
  SeniorVerifyType,
  TimeflowVerifyType,
  UserLoginType,
  UsersTimeflowType,
  VerifyLogoutType,
} from "../types";
import { MissionPostType } from "../types";
import { LeaveType } from "../types";

const timeflowServices = {
  getTimeflow: async (): Promise<UsersTimeflowType[]> => {
    const response = await api.get("/timeflow/list-user-logs/");
    return response.data;
  },
  getUsersLogin: async (): Promise<UserLoginType> => {
    const response = await api.get("/timeflow/user-login-log/");
    return response.data;
  },
  UsersLogoutAccept: async (data: VerifyLogoutType) => {
    const response = await api.post("/timeflow/user-logout-log/", data);
    return response.data;
  },
  UsersLogoutAcceptParent: async (data: VerifyLogoutType) => {
    const response = await api.post("/timeflow/user-logout-log-senior/", data);
    return response.data;
  },
  updateUserTimeflowAccept: async (data: TimeflowVerifyType, id: number) => {
    const response = await api.patch(`/timeflow/user-login-log/${id}/`, data);
    return response.data;
  },
  updateUsersLoginByParent: async (data: SeniorVerifyType, id: number) => {
    const response = await api.patch(
      `/timeflow/user-login-log-senior/${id}/`,
      data
    );
    return response.data;
  },
  getMission: async (): Promise<MissionType[]> => {
    const response = await api.get("/timeflow/user-mission-log/");
    return response.data;
  },
  createMission: async (data: MissionPostType) => {
    const response = await api.post(`/timeflow/user-mission-log/`, data);
    return response.data;
  },
  updateMission: async (id: number, data: MissionParentPostType) => {
    const response = await api.patch(`/timeflow/user-mission-log/${id}/`, data);
    return response.data;
  },
  getLeave: async (): Promise<LeaveType[]> => {
    const response = await api.get("/timeflow/user-leave-log/");
    return response.data;
  },
  createLeave: async (data: LeavePostType) => {
    const response = await api.post(`/timeflow/user-leave-log/`, data);
    return response.data;
  },
  updateLeave: async (id: number, data: LeaveParentPostType) => {
    const response = await api.patch(`/timeflow/user-leave-log/${id}/`, data);
    return response.data;
  },
};

export default timeflowServices;
