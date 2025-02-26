import { api } from "../../../api";
import { shiftTypes } from "../types";
import { Shift } from "../types/shifts.type";

const shiftsServices = {
  getShifts: async ():Promise<shiftTypes> => {
    const response = await api.get("/timeflow/set-shift/");
    return response.data;
  },

  create: async (data: Shift[]) => {
    const response = await api.post("/timeflow/set-shift/", data);
    return response.data;
  },

  update: async (id: string, data: object) => {
    const response = await api.patch(`/timeflow/set-shift/${id}`, data);
    return response.data;
  },
};

export default shiftsServices;
