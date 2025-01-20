import api from "../../../api/api";
import { PositionPostTypes } from "../types";
const patchPosition = async ({
  id,
  data,
}: {
  id: number;
  data: PositionPostTypes;
}) => {
  const response = await api.patch(`/positions/positions/${id}/`, data);

  return response.data;
};

export default patchPosition;
