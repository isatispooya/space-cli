import { api } from "../../../api";

const deleteShareholders = async (id: number) => {
  const response = await api.delete(`/shareholders/${id}/`);
  return response.data;
};

export default deleteShareholders;
