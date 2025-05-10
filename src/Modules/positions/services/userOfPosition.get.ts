import { api } from "@/api";

const getUserOfPosition = async () => {
  const response = await api.get("/positions/user-list-of-position/");

  return response.data;
};

export default getUserOfPosition;
