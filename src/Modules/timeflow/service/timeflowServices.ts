import { api } from "../../../api";
import { SeniorVerifyType, TimeflowVerifyType, UserLoginType } from "../types";

const timeflowServices = {
  getUsersLogin: async (): Promise<UserLoginType> => {
    const response = await api.get("/timeflow/user-login-log/");
    return response.data;
  },
  UsersLogoutAccept: async (data: any) => {
    const response = await api.post("/timeflow/user-logout-log/", data);
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
};

export default timeflowServices;
