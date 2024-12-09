import { CorrespondenceTypes } from "./correspondenceTypes";

export interface TableStoreTypes {
  selectedRow: CorrespondenceTypes | null;
  setSelectedRow: (row: CorrespondenceTypes) => void;
  isViewOpen: boolean;
  setIsViewOpen: (isOpen: boolean) => void;
  isEditOpen: boolean;
  setIsEditOpen: (isOpen: boolean) => void;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (isOpen: boolean) => void;
}
