export interface PermissionRole {
  clientId: string;
  code: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  protected: boolean;
  updatedAt: string;
  isAssigned: boolean;
  rolePermissions?: Array<{
    id: string;
    roleId: string;
    permissionId: string;
    type: number;
    permission: ExtendedPermission;
  }>;
}
export interface Permission {
  categoryId: string;
  code: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
}

export interface ExtendedPermission extends Permission {
  category: {
    id: string;
    name: string;
    type: number;
    code: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface PermissionCategory {
  id: string;
  name: string;
  type: number;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
}

export enum PermissionType {
  ADMIN = 1,
  CLIENT = 2,
}
