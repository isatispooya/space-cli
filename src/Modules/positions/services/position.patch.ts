import api from "../../../api/api";
import { PatchPositionParams } from "../types/postions.type";

const patchPosition = async ({ id, data }: PatchPositionParams) => {
  const response = await api.patch(`/positions/positions/${id}/`, data);

  return response.data;
};

export default patchPosition;
