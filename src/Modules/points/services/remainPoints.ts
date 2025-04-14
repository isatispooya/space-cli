import { api } from "../../../api";

const getRemainPoints = async () => {
  const response = await api.get("/club/remain-point/");
  return response.data;
};

export default getRemainPoints;
