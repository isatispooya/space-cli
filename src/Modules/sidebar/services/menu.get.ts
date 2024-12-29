import { api } from "../../../api";

export const getMenu = async () => {
  const response = await api.get("/core/menu/");
  return response.data;
};
