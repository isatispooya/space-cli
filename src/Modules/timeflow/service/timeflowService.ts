import { api } from "../../../api";

const timeflowService = {
  get: async () => {
    const response = await api.get("/timeflow/user-login-logs/");
    return response.data;
  },
  getVerify: async () => {
    const response = await api.get("/timeflow/verify-timeflow/");
    return response.data;
  },
  postVerify: async ( id: number , data: any) => {
    const response = await api.patch(`/timeflow/verify-timeflow/${id}/`, data);
    return response.data;
  },
};

export default timeflowService;
