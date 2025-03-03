import verifySlice from "@/Modules/timeflow/store/verifySlice";
import shiftsFormReducer from "@/Modules/workShifts/store/shiftsForm.store";
import chatReducer from "@/Modules/messenger/store/chatSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    verify: verifySlice,
    shiftsForm: shiftsFormReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
