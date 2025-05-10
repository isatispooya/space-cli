export interface PermissionDataType {
  id: number;
  name: string;
  codename: string;
}

export interface EditPermissionDataType {
  user_id: number;
  permission_id: number[];
}

export interface CreatePermissionDataType {
  groups: Array<{
    id: number;
    name: string;
    codename: string; 

  }>;
  ids: number[];
  user_id: number;
  name: string;
}
