import verifySlice from "@/Modules/timeflow/store/verifySlice";
import shiftsFormReducer from "@/Modules/workShifts/store/shiftsForm.store";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    verify: verifySlice,
    shiftsForm: shiftsFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
