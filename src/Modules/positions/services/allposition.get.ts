import api from "../../../api/api";

const getAllPositions = async () => {
  const response = await api.get("/positions/all-positions/");
  return response.data;
};

export default getAllPositions;
