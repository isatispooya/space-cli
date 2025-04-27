import { SxProps, Theme } from "@mui/material";
import { DateObject } from "react-multi-date-picker";

// Basic shift type
export interface Shift {
  id: number;
  name: string;
}

// Company related types
export interface CompanyAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface ShiftDay {
  date: string;
  start_time: string | null;
  end_time: string | null;
  work_day: boolean;
}

export interface ShiftPayload {
  shiftname: string;
  day: WorkShiftTypes["ShiftDay"][];
}

export interface SetShiftUserPostType {
  uniqueidentifier: string;
  shift_id: number;
}

// Basic shift assignment response type
export interface ShiftAssignResponse {
  id: number;

  user: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
  shift_detail?: {
    id: number;
    name: string;
  };
}

export interface ShiftTypes {
  id: number;
  shift: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    owner: number;
  };
  date: string;
  start_time: string;
  end_time: string;
  work_day: boolean;
  day_of_week: string;
  created_at: string;
  updated_at: string;
}

export interface FormShiftState {
  date: string;
  shiftName: string;
  startTime: DateObject | null;
  endTime: DateObject | null;
  isWorkDay: boolean;
}

export interface CompanyDetails {
  id: number;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  companyType: string;
  registrationNumber: number;
  nationalId: string;
  website: string;
  yearOfEstablishment: number;
  registeredCapital: number;
  totalShares: number | null;
  typeOfActivity: string;
  logo: string;
  letterhead: string;
  seal: string;
  signature: string;
}

// User related types
export interface UserBasicInfo {
  id: number;
  firstName: string;
  lastName: string;
  uniqueIdentifier: string;
}

export interface UserProfile extends UserBasicInfo {
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  employeeId?: string;
}

// Shift related types
export type ShiftStatus = "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "TEMPORARY";

export interface ShiftTimeRange {
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
}

export interface ShiftDetails {
  id: number;
  name: string;
  owner: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
  location?: string;
  capacity?: number;
  status: ShiftStatus;
}

// Main shift assignment interface
export interface ShiftAssignment {
  id?: number;
  company: number;
  companyDetail: CompanyDetails;
  user: UserBasicInfo;
  shiftDetail: ShiftDetails;
  startDate: string;
  endDate: string;
  typeOfEmployment: EmploymentType;
  isDefault: boolean;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  parent?: number;
}

// Response types for API calls
export interface ShiftResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface PaginatedShiftResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ShiftScheduleProps {
  shiftName: string;
  dates: DateObject[];
  onShiftNameChange: (value: string) => void;
  onDateChange: (dates: DateObject[]) => void;
  sx?: SxProps<Theme>;
}

export interface ShiftListProps {
  shifts: WorkShiftTypes["FormShiftState"][];
  isSubmitting: boolean;
  searchQuery: string;
  visibleItems: number;
  shiftName: string;
  onSearchChange: (query: string) => void;
  onLoadMore: () => void;
  onDelete: (index: number) => void;
  onUpdate: (
    index: number,
    field: keyof Pick<
      WorkShiftTypes["FormShiftState"],
      "startTime" | "endTime" | "isWorkDay"
    >,
    value: DateObject | null | boolean
  ) => void;
  onSubmit: () => void;
}

// Request types for API calls
export interface CreateShiftRequest {
  companyId: number;
  userId: number;
  shiftDetailId: number;
  startDate: string;
  endDate: string;
  typeOfEmployment: EmploymentType;
  description?: string;
  isDefault?: boolean;
}

export interface UpdateShiftRequest
  extends Partial<Omit<CreateShiftRequest, "companyId">> {
  id: number;
}

// Filter and search types
export interface ShiftFilter {
  startDate?: string;
  endDate?: string;
  companyId?: number;
  userId?: number;
  status?: ShiftStatus;
  employmentType?: EmploymentType;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface FormShiftAssignment {
  userId: number;
  userName: string;
  shiftId?: number;
  shiftName?: string;
  isRegistered: boolean;
  isEditing: boolean;
  assignmentId?: number;
}

// Error handling types
export interface ShiftError {
  code: string;
  message: string;
  field?: string;
}

export interface ShiftItemProps {
  shift: WorkShiftTypes["FormShiftState"];
  index: number;
  onDelete: (index: number) => void;
  onUpdate: (
    index: number,
    field: keyof Pick<
      WorkShiftTypes["FormShiftState"],
      "startTime" | "endTime" | "isWorkDay"
    >,
    value: DateObject | null | boolean
  ) => void;
}

export type ShiftValidationErrors = Record<string, ShiftError>;

export interface ShiftName {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  owner: number;
}

export interface UpdateShiftPayload {
  shiftname: string;
  day: WorkShiftTypes["ShiftDay"][];
}

export interface ShiftUpdatePayload {
  start_time: string;
  end_time: string;
  work_day: boolean;
  day_of_week: string;
  date: string;
  shift: number;
}

export type WorkShiftTypes = {
  Shift: Shift;
  CompanyAddress: CompanyAddress;
  ShiftDay: ShiftDay;
  ShiftPayload: ShiftPayload;
  SetShiftUserPostType: SetShiftUserPostType;
  ShiftAssignResponse: ShiftAssignResponse;
  ShiftTypes: ShiftTypes;
  FormShiftState: FormShiftState;
  CompanyDetails: CompanyDetails;
  UserBasicInfo: UserBasicInfo;
  UserProfile: UserProfile;
  ShiftTimeRange: ShiftTimeRange;
  ShiftDetails: ShiftDetails;
  ShiftAssignment: ShiftAssignment;
  ShiftResponse: ShiftResponse<unknown>;
  PaginatedShiftResponse: PaginatedShiftResponse<unknown>;
  CreateShiftRequest: CreateShiftRequest;
  UpdateShiftRequest: UpdateShiftRequest;
  ShiftFilter: ShiftFilter;
  ShiftError: ShiftError;
  ShiftValidationErrors: ShiftValidationErrors;
  FormShiftAssignment: FormShiftAssignment;
  ShiftListProps: ShiftListProps;
  ShiftItemProps: ShiftItemProps;
  ShiftScheduleProps: ShiftScheduleProps;
  ShiftName: ShiftName;
  UpdateShiftPayload: UpdateShiftPayload;
  ShiftUpdatePayload: ShiftUpdatePayload;
};

export default WorkShiftTypes;
