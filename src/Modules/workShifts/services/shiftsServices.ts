import { api } from "../../../api";
import { Shift } from "../types/shifts.type";

const shiftsServices = {
  getShifts: async () => {
    const response = await api.get("/timeflow/set-shift/");
    return response.data;
  },

  create: async (data: Shift[]) => {
    const response = await api.post("/timeflow/set-shift/", data);
    return response.data;
  },
};

export default shiftsServices;
