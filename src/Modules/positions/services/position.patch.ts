import api from "../../../api/api";
import { PositionPostType } from "../types";
const patchPosition = async ({
  id,
  data,
}: {
  id: number;
  data: PositionPostType;
}) => {
  const response = await api.patch(`/positions/positions/${id}/`, data);

  return response.data;
};

export default patchPosition;
