import { api } from "../../../api";

const getRemainPoints = async () => {
  const response = await api.get("/marketing/remain-point/");
  return response.data;
};

export default getRemainPoints;
