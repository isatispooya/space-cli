import { create } from "zustand";

interface TableStore {
  selectedRow: number | null;
  setSelectedRow: (row: unknown) => void;
  paginationModel: { page: number; pageSize: number };
  setPaginationModel: (model: { page: number; pageSize: number }) => void;
  pageSizeOptions: number[];
  isDeleteOpen: boolean;
  setIsDeleteOpen: (open: boolean) => void;
  isEditOpen: boolean;
  setIsEditOpen: (open: boolean) => void;
  isPrintOpen: boolean;
  setIsPrintOpen: (open: boolean) => void;
}
export const useTableStore = create<TableStore>((set) => ({
  selectedRow: null,
  setSelectedRow: (row: unknown) => set({ selectedRow: row as number | null }),
  paginationModel: { page: 0, pageSize: 10 },
  setPaginationModel: (model) => set({ paginationModel: model }),
  pageSizeOptions: [10, 20, 50, 100],
  isDeleteOpen: false,
  setIsDeleteOpen: (open) => set({ isDeleteOpen: open }),
  isEditOpen: false,
  setIsEditOpen: (open) => set({ isEditOpen: open }),
  isPrintOpen: false,
  setIsPrintOpen: (open) => set({ isPrintOpen: open }),
}));
