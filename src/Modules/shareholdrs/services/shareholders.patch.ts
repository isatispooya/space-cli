import { api } from "../../../api";
import { ShareholdersTypes } from "../types";

const patchShareholders = async (
  id: number,
  data: ShareholdersTypes
) => {
  const response = await api.patch(`/shareholders/${id}/`, data);
  return response;
};

export default patchShareholders;
