/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../api";
import {
  SeniorVerifyType,
  TimeflowEditType,
  TimeflowVerifyType,
  UserLoginType,
  UsersTimeflowType,
} from "../types";

const timeflowServices = {
  getTimeflow: async (): Promise<UsersTimeflowType[]> => {
    const response = await api.get("/timeflow/list-user-logs/");
    return response.data;
  },
  getUsersLogin: async (): Promise<UserLoginType> => {
    const response = await api.get("/timeflow/user-login-log/");
    return response.data;
  },

  updateUserTimeflowAccept: async (data: TimeflowVerifyType, id: number) => {
    const response = await api.patch(`/timeflow/user-login-log/${id}/`, data);
    return response.data;
  },
  UserTimeflowAccept: async (data: TimeflowVerifyType) => {
    const response = await api.post(`/timeflow/user-login-log/`, data);
    return response.data;
  },

  updateUsersLoginByParent: async (data: SeniorVerifyType, id: number) => {
    const response = await api.patch(
      `/timeflow/user-login-log-senior/${id}/`,
      data
    );
    return response.data;
  },

  getTimeflowDetails: async (
    // year: number,
    // month: number
  ): Promise<UserLoginType> => {
    const response = await api.get(
      `/timeflow/list-user-logs/`
    );
    return response.data;
  },

  getUserAllTimeflow: async () => {
    const response = await api.get("/timeflow/user-all-log/");
    return response.data;
  },
  patchTimeflowEdit: async (id: number, data: TimeflowEditType) => {
    const response = await api.patch(`/timeflow/user-login-log/${id}/`, data);
    return response.data;
  },
};

export default timeflowServices;
