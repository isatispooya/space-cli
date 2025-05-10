import chatReducer from "@/Modules/messenger/store/chatSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export default store;
