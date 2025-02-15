import api from "../../../api/api";

const UserPro = {
  getUsers: async () => {
    const response = await api.get("/user-complete/");
    return response.data;
  },
  getUser: async (id: number) => {
    const response = await api.get(`/user-complete/${id}`);
    return response.data;
  },
};
export default UserPro;
