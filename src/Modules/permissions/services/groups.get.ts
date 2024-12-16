import { api } from "../../../api";

const getGroups = async () => {
  const response = await api.get("/groups/");
  return response.data;
};

export default getGroups;
