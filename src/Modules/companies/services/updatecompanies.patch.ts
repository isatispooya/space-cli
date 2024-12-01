import api from "../../../api/api";
import { CompanyFormValues } from "../types";

const updateCompany = async (
  id: number,
  data: CompanyFormValues
) => {
  const response = await api.patch(`/companies/${id}/`, data);
  return response.data;
};

export default updateCompany;
