import { api } from "../../../api";

const logoutService = {
  post: async (refresh_token: string) => {
    const response = await api.post("/logout/", {
        refresh: refresh_token
    });
    return response.data;
  },
};

export default logoutService;
