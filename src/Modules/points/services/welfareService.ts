import { api } from "../../../api";

const getWelfare = async () => {
  const response = await api.get("/positions/welfare-services/");
  return response.data;
};

export default getWelfare;
