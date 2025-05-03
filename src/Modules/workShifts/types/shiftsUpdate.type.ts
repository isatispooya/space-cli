import { shiftTypes } from "./workShiftTypes";

export interface EditForm {
  start_time: string;
  end_time: string;
  work_day: boolean;
}

export interface TimePickerFieldProps {
  label: string;
  onChange: (time: string) => void;
}

export interface ShiftItemProps {
  item: shiftTypes;
  editingId: number | null;
  editForm: EditForm;
  onEdit: (item: shiftTypes) => void;
  onCancel: () => void;
  onTimeChange: (field: string, value: string) => void;
  onDelete: (item: shiftTypes) => void;
  onSave: (item: shiftTypes) => void;
}

export interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  shiftToDelete: shiftTypes | null;
}

export interface DeleteEntireShiftDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  shiftName: string;
}