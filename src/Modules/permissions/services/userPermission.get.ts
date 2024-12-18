import { api } from "../../../api";

const getuserPermission = async () => {
  const response = await api.get("/permissions-for-user/");
  return response.data;
};

export default getuserPermission;
