import api from "../../../api/api";

const UserPro = async () => {
  const response = await api.get("/user-complete/");
  return response.data;
};
export default UserPro;
