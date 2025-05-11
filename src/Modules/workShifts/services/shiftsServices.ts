import { api } from "@/api";
import { ShiftType } from "../types";

const shiftsServices = {
  getShifts: async (): Promise<ShiftType["getRes"][]> => {
    const { data } = await api.get("/timeflow/shift/");
    // Ensure data is an array
    return Array.isArray(data) ? data : [data];
  },
  createShifts: async (
    shiftData: ShiftType["postReq"]
  ): Promise<ShiftType["postRes"]> => {
    const { data } = await api.post("/timeflow/shift/", shiftData);
    return data;
  },
  createShiftsDates: async (
    datesData: ShiftType["postDatesReq"]
  ): Promise<ShiftType["postDatesRes"]> => {
    const { data } = await api.post("/timeflow/shift-date/", datesData);
    return data;
  },
  getShiftsDates: async (id: string): Promise<ShiftType["datesRes"]> => {
    const response = await api.get(`/timeflow/shift-detail/${id}/`);
    return response.data;
  },
  deleteShifts: async (id: string): Promise<ShiftType["deleteRes"]> => {
    const { data } = await api.delete(`/timeflow/shift/${id}/`);
    return data;
  },
  deleteShiftsDates: async (id: string): Promise<ShiftType["deleteRes"]> => {
    const { data } = await api.delete(`/timeflow/shift-date/${id}/`);
    return data;
  },
  updateShiftsDates: async (
    id: string,
    data: ShiftType["updateDatesReq"]
  ): Promise<ShiftType["updateDatesRes"]> => {
    const response = await api.patch(`/timeflow/shift-date/${id}/`, data);
    return response.data;
  },
  createShiftsAssignments: async (
    data: ShiftType["assignReq"]
  ): Promise<ShiftType["assignRes"]> => {
    const response = await api.post("/timeflow/set-shift-for-user/", data);
    return response.data;
  },
};

export default shiftsServices;
