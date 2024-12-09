import { create } from "zustand";
import { CorrespondenceTypes } from "../types";
import { TableStoreTypes } from "../types";

export const useCorrespondenceTableStore = create<TableStoreTypes>((set) => ({
  selectedRow: null,
  setSelectedRow: (row: CorrespondenceTypes | null) => set({ selectedRow: row }),
  isViewOpen: false,
  setIsViewOpen: (isOpen: boolean) => set({ isViewOpen: isOpen }),
  isEditOpen: false,
  setIsEditOpen: (isOpen: boolean) => set({ isEditOpen: isOpen }),
  isDeleteOpen: false,
  setIsDeleteOpen: (isOpen: boolean) => set({ isDeleteOpen: isOpen }),
}));
