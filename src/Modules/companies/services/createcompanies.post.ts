import api from "../../../api/api";

export interface ICreateCompaniesPost {
  name: string;
  company_type: string;
  year_of_establishment: string;
}

const createCompaniesPost = async (data: ICreateCompaniesPost) => {
  const response = await api.post(`/companies/`, data);
  return response.data;
};
 
export default createCompaniesPost;