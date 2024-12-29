import api from "../../../api/api";
import { server } from "../../../api/server";

const profileService = {
  get: async () => {
    const response = await api.get(`${server}/user/profile/`);
    return response.data;
  },
  
  update: async (data: FormData) => {
    const response = await api.patch(`${server}/user/profile/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default profileService;