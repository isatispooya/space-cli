import { api } from "../../../api";

const notificationService = {
    get: async () => {
      const response = await api.get("marketing/notification/");
      return response.data;
    },
    put: async (id: number) => {
        const response = await api.put(`marketing/notification/${id}/`, {
          read: true
        });
        return response.data;
      },
  };

  export default notificationService;