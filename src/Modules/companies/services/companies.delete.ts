import api from "../../../api/api";

const deleteCompany = async (id: number) => {
  const response = await api.delete(`/companies/${id}/`);
  return response.data;
};
 
export default deleteCompany;