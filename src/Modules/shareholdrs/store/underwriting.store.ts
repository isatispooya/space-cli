import { create } from "zustand";
import { underwritingStoreTypes } from "../types/underwritingStore.type";

 const useUnderwritingStore = create<underwritingStoreTypes>((set) => ({
  id: 0,
  setId: (id: number) => set({ id }),
  isDescriptionOpen: false,
  setIsDescriptionOpen: (isDescriptionOpen: boolean) =>
    set({ isDescriptionOpen }),
  showPopup: false,
  setShowPopup: (showPopup: boolean) => set({ showPopup }),
  selectedDescription: "",
  setSelectedDescription: (selectedDescription: string) =>
    set({ selectedDescription }),
}));


export default useUnderwritingStore;
