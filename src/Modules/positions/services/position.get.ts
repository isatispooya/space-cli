import { api } from "@/api";

const getPositions = async () => {
  const response = await api.get("/positions/positions/");
  return response.data;
};

export default getPositions;
