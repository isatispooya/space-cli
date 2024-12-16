import { api } from "../../../api";

const GetShortcuts = async () => {
  const response = await api.get("/core/shortcuts/");
  return response.data;
};

export default GetShortcuts;
