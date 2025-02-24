import { api } from "../../../api";
import { Shift } from "../types/shifts.type";

const shiftsServices = {
  create: async (data: Shift[]) => {
    const response = await api.post("/timeflow/set-shift/", data);
    return response.data;
  },
};

export default shiftsServices;
