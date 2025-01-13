import { api } from "../../../api";

const getUpdatePosition = async (id: number) => {
  const response = await api.get(`/positions/positions/${id}/`);
  return response.data;
};

export default getUpdatePosition;

