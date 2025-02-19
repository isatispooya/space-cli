import { api } from "../../../api";

const pointServices = {
  getPoint: async () => {
    const response = await api.get("/club/point/");
    return response.data;
  },
};
export default pointServices;
