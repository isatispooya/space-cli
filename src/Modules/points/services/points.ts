import { api } from "../../../api";

const pointServices = {
  getPoint: async () => {
    const response = await api.get("/marketing/point/");
    return response.data;
  },
};
export default pointServices;
