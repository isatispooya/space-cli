import { api } from "../../../api";

const getTimeFlow = {
  get: async () => {
    const response = await api.get("/timeflow/user-login-logs/");
    return response.data;
  },
};

export default getTimeFlow;
