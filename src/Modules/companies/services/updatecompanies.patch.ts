import api from "../../../api/api";
import { CompanyFormValues } from "../types";

const updateCompany = async (data: CompanyFormValues) => {
  const response = await api.patch(`/companies/`, data);
  return response.data;
};

export default updateCompany;
