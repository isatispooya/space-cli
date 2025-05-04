import chatReducer from "@/Modules/messenger/store/chatSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
