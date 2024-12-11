import { api } from "../../../api";

 const getPermissionList = async () => {
  const response = await api.get("/permissions");
  return response.data;
};

export default getPermissionList;


