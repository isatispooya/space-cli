import { api } from "../../../api";
import { DisplacementPrecendenceTypes } from "../types";

const postDisplacementPrecendence = async (
  data: DisplacementPrecendenceTypes
) => {
  const response = await api.post(
    "/stock_affairs/displacement_precedence/",
    data
  );
  return response.data;
};

export default postDisplacementPrecendence;
