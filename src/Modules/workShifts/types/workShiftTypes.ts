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

// Error handling types
export interface ShiftError {
  code: string;
  message: string;
  field?: string;
}

export type ShiftValidationErrors = Record<string, ShiftError>;
