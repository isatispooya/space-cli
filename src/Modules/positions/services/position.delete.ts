import { api } from "@/api";

const deletePosition = async (id: number) => {
  const response = await api.delete(`/positions/positions/${id}/`);
  return response.data;
};

export default deletePosition;
