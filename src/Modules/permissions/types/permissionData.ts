export interface PermissionData {
  id: number;
  name: string;
  codename: string;
}

export interface EditPermissionData {
  user_id: number;
  permission_id: number[];
}

export interface CreatePermissionData {
  user_id: number;
  groups: number[];
}
