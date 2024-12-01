import api from "../../../api/api";

const getUsers = async () => {
  const response = await api.get("/users/");
  return response.data;
};
 
export default getUsers;