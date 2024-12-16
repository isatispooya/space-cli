export interface CreatePermissionData {
  groups: number[];  // Array of permission IDs
  name: string;
}

export interface Permission {
  id: number;
  name: string;
  codename: string;
} 