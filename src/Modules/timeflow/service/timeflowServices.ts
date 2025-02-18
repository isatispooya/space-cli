import { api } from "../../../api";
import { SeniorVerifyType, TimeflowVerifyType, UserLoginType } from "../types";

const timeflowServices = {
  getUsersLogin: async (): Promise<UserLoginType> => {
    const response = await api.get("/timeflow/user-login-log/");
    return response.data;
  },

  getUsersLogout: async () => {
    const response = await api.get("/timeflow/user-logout-log/");
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
  getMissions: async () => {
    const response = await api.get("/timeflow/user-mission-log/");
    return response.data;
  },
  postMissions: async (data: any) => {
    const response = await api.post("/timeflow/user-mission-log/", data);
    return response.data;
  },
};

export default timeflowServices;
