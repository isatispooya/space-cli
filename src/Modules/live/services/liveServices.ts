import { api } from "../../../api";

const liveServices = {
  getLiveStream: async () => {
    const response = await api.get("/marketing/live-stream/");
    return response.data;
  },
};

export default liveServices;
