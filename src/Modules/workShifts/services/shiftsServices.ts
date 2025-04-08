import { api } from "../../../api";
import { WorkShiftTypes } from "../types";

const shiftsServices = {
  getShifts: async (): Promise<WorkShiftTypes["shiftTypes"]> => {
    const response = await api.get("/timeflow/set-shift/");
    return response.data;
  },

  getShiftsNames: async (): Promise<WorkShiftTypes["ShiftName"][]> => {
    const response = await api.get("/timeflow/list-shift-name/");
    return response.data;
  },

  create: async (data: WorkShiftTypes["ShiftPayload"]) => {
    const response = await api.post("/timeflow/set-shift/", data);
    return response.data;
  },

  update: async (id: string, data: WorkShiftTypes["ShiftPayload"]) => {
    const response = await api.patch(`/timeflow/set-shift/${id}`, data);
    return response.data;
  },
  getShiftsassign: async () => {
    const response = await api.get("/positions/list-of-subcategory/");
    console.log(response.data, "shiftassaindsd");
    return response.data;
  },

  createShiftsassign: async (
    SetShiftUser: WorkShiftTypes["SetShiftUserPostType"]
  ) => {
    const response = await api.patch(
      `/timeflow/set-shift-user/${SetShiftUser.shift_id}/`,
      {
        uniqueidentifier: SetShiftUser.uniqueidentifier,
      }
    );
    return response.data;
  },
  updateShifts: async (
    SetShiftUser: WorkShiftTypes["SetShiftUserPostType"],
    data: WorkShiftTypes["ShiftPayload"]
  ) => {
    const response = await api.patch(
      `/timeflow/update-shift/${SetShiftUser.shift_id}/`,
      data
    );
    return response.data;
  },
};

export default shiftsServices;
