import api from "../../../api/api";

const UserPro = async () => {
  const response = await api.get("/marketing/introducer-user/");
  return response.data;
};

export default UserPro;
