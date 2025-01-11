import api from "../../../api/api";
import { PositionFormValues } from "../types";

const createPosition = async (data: PositionFormValues) => {
  const apiData = {
    ...data,
    company: Number(data.company),
    parent: data.parent ? Number(data.parent) : null,
    type_of_employment: Number(data.type_of_employment),
  };
  return api.post("/positions/", apiData);
};

export default createPosition;