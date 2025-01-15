import { api } from "../../../api";

const missionServices = {
  getMissions: async () => {
    const response = await api.get("/marketing/mission/");
    return response.data;
  },
};

export default missionServices;
