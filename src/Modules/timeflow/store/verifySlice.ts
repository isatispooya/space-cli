import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import OwnLog from "../types/ownLogs.type";
import OtherLog from "../types/otherLogs.type";
import { VerifySliceTypes } from "../types";

const initialState: VerifySliceTypes["verifyState"] = {
  ownLogs: [],
  otherLogs: [],
  isOpenOwn: false,
  isOpenAbsense: false,
  isOpenOther: false,
  selectedOwnTimes: {},
  selectedOtherTimes: {},
};

export const VerifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    setOwnLogs: (state, action: PayloadAction<OwnLog[]>) => {
      state.ownLogs = action.payload;
    },
    setOtherLogs: (state, action: PayloadAction<OtherLog[]>) => {
      state.otherLogs = action.payload;
    },
    toggleOpenOwn: (state) => {
      state.isOpenOwn = !state.isOpenOwn;
    },
    setOpenOwn: (state, action: PayloadAction<boolean>) => {
      state.isOpenOwn = action.payload;
    },
    toggleOpenAbsense: (state) => {
      state.isOpenAbsense = !state.isOpenAbsense;
    },
    setOpenAbsense: (state, action: PayloadAction<boolean>) => {
      state.isOpenAbsense = action.payload;
    },
    toggleOpenOther: (state) => {
      state.isOpenOther = !state.isOpenOther;
    },
    setOpenOther: (state, action: PayloadAction<boolean>) => {
      state.isOpenOther = action.payload;
    },
    setSelectedOwnTime: (
      state,
      action: PayloadAction<{ logId: number; time: Date | null }>
    ) => {
      state.selectedOwnTimes[action.payload.logId] = action.payload.time;
    },
    clearSelectedOwnTime: (state, action: PayloadAction<number>) => {
      delete state.selectedOwnTimes[action.payload];
    },
    setSelectedOtherTime: (
      state,
      action: PayloadAction<{ logId: number; time: Date | null }>
    ) => {
      state.selectedOtherTimes[action.payload.logId] = action.payload.time;
    },
    clearSelectedOtherTime: (state, action: PayloadAction<number>) => {
      delete state.selectedOtherTimes[action.payload];
    },
    updateOwnLogStatus: (
      state,
      action: PayloadAction<{ logId: number; time: string }>
    ) => {
      state.ownLogs = state.ownLogs.map((log) =>
        log.id === action.payload.logId
          ? { ...log, time_user: action.payload.time, status_self: "approved" }
          : log
      );
    },
    updateOtherLogStatus: (
      state,
      action: PayloadAction<{ logId: number; time: string }>
    ) => {
      state.otherLogs = state.otherLogs.map((log) =>
        log.id === action.payload.logId
          ? {
              ...log,
              time_parent: action.payload.time,
              status_parent: "approved",
            }
          : log
      );
    },
  },
});

export const {
  setOwnLogs,
  setOtherLogs,
  toggleOpenOwn,
  setOpenOwn,
  toggleOpenAbsense,
  setOpenAbsense,
  toggleOpenOther,
  setOpenOther,
  setSelectedOwnTime,
  clearSelectedOwnTime,
  setSelectedOtherTime,
  clearSelectedOtherTime,
  updateOwnLogStatus,
  updateOtherLogStatus,
} = VerifySlice.actions;

export default VerifySlice.reducer;
