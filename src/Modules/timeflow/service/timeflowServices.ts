import { api } from "../../../api";
import { TimeflowVerifyType, UserLoginType } from "../types";

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
  updateUsersLoginByParent: async (data: TimeflowVerifyType, id: number) => {
    const response = await api.patch(
      `/timeflow/user-login-log-senior/${id}/`,
      data
    );
    return response.data;
  },
};

export default timeflowServices;
