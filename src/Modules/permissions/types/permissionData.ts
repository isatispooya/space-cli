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
  groups: Array<{
    id: number;
    name: string;
    codename: string; 

  }>;
  ids: number[];
  user_id: number;
  name: string;
}
