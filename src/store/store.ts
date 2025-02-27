import verifySlice from "@/Modules/timeflow/store/verifySlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    verify: verifySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
