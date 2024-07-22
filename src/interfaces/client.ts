import { AddUserDto } from 'pages-modules/client/validations';
import { User } from './user';

export interface Documents {
  clientId: number;
  createdAt: string;
  filePath: string;
  id: number;
  name: string;
  size: number;
  type: string;
  updatedAt: string;
  uploadedByUserId: number;
}
export interface Client {
  id: string;
  uuid?: string;
  email?: string;
  approverUser?: Omit<User, 'client'>;
  clientEmail?: string;
  name?: string;
  corporateID?: string;
  subDomain?: string;
  status?: ClientRegistrationStatus;
  phoneNumber?: string;
  clientPhoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  documents?: Documents[];
  rejectReason?: string;
}

export enum ClientStatus {
  PENDING = 1,
  APPROVE = 2,
  REJECT = 3,
}

export interface ClientRegistration {
  id: number;
  email: string;
  name: string;
  corporateID: string;
  phoneNumber: string;
  subDomain: 'apple';
  status: number;
  rejectReason: string | null;
  approverUserId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ClientRegistrationFiles {
  name: string;
  filePath: string;
  type: string;
  size: string;
  deleted?: boolean;
}

export enum ClientRegistrationStatus {
  PENDING = 1,
  APPROVE = 2,
  REJECT = 3,
  ADMIN_CREATED = 4,
}
