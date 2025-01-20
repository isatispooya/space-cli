import api from "../../../api/api";
import { PositionPostTypes } from "../types";

const createPosition = async (data: PositionPostTypes) => {
  const apiData = {
    ...data,
    company: Number(data.company),
    parent: data.parent ? Number(data.parent) : null,
    type_of_employment: data.type_of_employment || null,
  };
  return api.post("/positions/positions/", apiData);
};

export default createPosition;