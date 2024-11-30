import api from "../../../api/api";

const getCompanies = async () => {
  const response = await api.get("/companies/");
  return response.data;
};

export default getCompanies;
