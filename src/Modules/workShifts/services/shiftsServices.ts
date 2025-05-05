import { api } from "@/api";
import { ShiftTypes } from "../types";

const shiftsServices = {
  getShifts: async (): Promise<ShiftTypes["getRes"]> => {
    const { data } = await api.get("/timeflow/shift/");
    return data;
  },
  createShifts: async (
    shiftData: ShiftTypes["postReq"]
  ): Promise<ShiftTypes["postRes"]> => {
    const { data } = await api.post("/timeflow/shift/", shiftData);
    return data;
  },
  createShiftsDates: async (
    datesData: ShiftTypes["postDatesReq"]
  ): Promise<ShiftTypes["postDatesRes"]> => {
    const { data } = await api.post("/timeflow/shift-date/", datesData);
    return data;
  },
  getShiftsDates: async (id: string): Promise<ShiftTypes["datesRes"]> => {
    const response = await api.get(`/timeflow/shift-detail/${id}/`);
    return response.data;
  },
  deleteShifts: async (id: string): Promise<ShiftTypes["deleteRes"]> => {
    const { data } = await api.delete(`/timeflow/shift/${id}/`);
    return data;
  },
  deleteShiftsDates: async (id: string): Promise<ShiftTypes["deleteRes"]> => {
    const { data } = await api.delete(`/timeflow/shift-date/${id}/`);
    return data;
  },
  updateShiftsDates: async (
    id: string,
    data: ShiftTypes["updateDatesReq"]
  ): Promise<ShiftTypes["updateDatesRes"]> => {
    const response = await api.patch(`/timeflow/shift-date/${id}/`, data);
    return response.data;
  },
  createShiftsAssignments: async (
    data: ShiftTypes["assignReq"]
  ): Promise<any> => {
    const response = await api.post("/timeflow/set-shift-for-user/", data);
    return response.data;
  },
};

export default shiftsServices;
