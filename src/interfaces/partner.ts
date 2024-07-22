export enum RelationshipStatus {
  NO_RELATIONSHIP = 1,
  PENDING = 2,
  ACCEPTED = 3,
  INVITED = 4,
  RECEIVED = 5,
}

export interface Partner {
  id: any;
  email: string;
  name: string;
  corporateID: string;
  phoneNumber: string;
  subDomain: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted?: boolean | null;
  relationshipStatus: RelationshipStatus;
  userCount: number;
  briefCount: number;
  connectionCount: number;
  requestId?: number | null;
  userPrimaryContact: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: true;
    emailVerified: true;
    isPrimaryContact: true;
    firstChangePassword: true;
    partnerId: number | null;
    clientId: number;
    oldUserId: number | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export interface PartnerFormValue extends Partner {
  primaryContactName: string;
}

export enum PartnerTab {
  MY_PARTNER = 1,
  INVITED = 2,
  RECEIVED = 3,
  ALL = 4,
}
