import { api } from "../../../api";
import { DisplacementPrecendenceTypes } from "../types";

const displacementPrecendencePatch = (
  data: DisplacementPrecendenceTypes,
  id: number
) => {
  return api.patch(`/stock_affairs/displacement_precedence/${id}/`, data);
};

export default displacementPrecendencePatch;
