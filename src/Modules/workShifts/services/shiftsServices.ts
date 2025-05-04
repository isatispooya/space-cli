/* eslint-disable @typescript-eslint/no-explicit-any */
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
  deleteShifts: async (id: string): Promise<any> => {
    const { data } = await api.delete(`/timeflow/shift/${id}/`);
    return data;
  },
};

export default shiftsServices;
