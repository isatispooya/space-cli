import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatType } from "../types/chat.type";

const initialState: ChatType["ChatStateTypes"] = {
  selectedUserId: null,
  showAllUsers: false,
  searchQuery: "",
  searchPositionQuery: "",
  users: [],
  positionUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },
    setShowAllUsers: (state, action: PayloadAction<boolean>) => {
      state.showAllUsers = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchPositionQuery: (state, action: PayloadAction<string>) => {
      state.searchPositionQuery = action.payload;
    },
    setUsers: (state, action: PayloadAction<ChatType["UserMessageType"][]>) => {
      state.users = action.payload;
    },
    setPositionUsers: (
      state,
      action: PayloadAction<ChatType["UserPositionType"][]>
    ) => {
      state.positionUsers = action.payload;
    },
  },
});

export const {
  setSelectedUserId,
  setShowAllUsers,
  setSearchQuery,
  setSearchPositionQuery,
  setUsers,
  setPositionUsers,
} = chatSlice.actions;

export default chatSlice.reducer;
