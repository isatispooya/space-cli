import { api } from "../../../api";

const timeflowServices = {
  getUsersLogin: async () => {
    const response = await api.get("/timeflow/user-login-log/");
    return response.data;
  },
};

export default timeflowServices;
