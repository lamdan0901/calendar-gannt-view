import { Client } from './client';
import { Partner } from './partner';
import { Permission } from './permission';

export interface User {
  id: any;
  email: string;
  userName: string;
  isActive: boolean;
  emailVerified: boolean;
  isPrimaryContact: boolean;
  partnerId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  firstName: string;
  lastName: string;
  name?: string;
  role?: string;
  client?: Client;
  partner?: Partner;
  isDeleted?: boolean;
  clientId?: number;
  systemRole: Permission;
}

export interface PrimaryContact {
  userPrimaryContact: User;
  briefCount: number;
  connectionCount: number;
  userCount: number;
}
export interface ProjectUser {
  id: string;
  email?: string;
  isPrimaryContact?: boolean;
  firstName: string;
  lastName: string;
  userName?: string;
  fullName?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  client?: {
    id?: string;
    email?: string;
    name?: string;
    corporateID?: string;
    phoneNumber?: string;
    subDomain?: string;
  };
}

export interface UserConfirmation {
  id: number;
  userId: number;
  type: number;
  code: number;
  status: number;
  expired: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: null | string;
    isActive: boolean;
    emailVerified: boolean;
    isPrimaryContact: false;
    firstChangePassword: boolean;
    partnerId: null | string;
    clientId: number;
    oldUserId: null | string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
  };
}
export enum ConfirmationStatus {
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
}
