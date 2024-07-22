import { PjWorkingGroupConfirmStatus } from "./common";

export enum ProjectStep {
  CREATE_NEW_PROJECT = 1,
  PROJECT_DETAILS = 2,
  SUPPORTING_DOCUMENTS = 3,
  REVIEW = 4,
}

export enum ProjectStatus {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  COMPLETE = 3,
}

export interface WorkingGroup {
  id: string;
  acceptStatus: number;
  member: any;
  fullName?: string;
  confirmStatus: PjWorkingGroupConfirmStatus;
}

export interface SectionOwnerDetails {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  fullName?: string | null;
}
export interface SectionOwner {
  id: number;
  userId: string;
  projectId: number;
  customSectionId: number;
  user: SectionOwnerDetails;
}
export interface CustomSectionData {
  action: number;
  id: number;
  title: string;
  content: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
  customSectionViewers: CustomSectionViewers[];
  customSectionOwners: SectionOwner[];
  customSectionQuestions: CustomSectionQuestions[];
}
export interface CustomSectionQuestions {
  content: string;
  createdAt: string;
  customSectionAnswers: CustomSectionAnswers[];
  customSectionId: number;
  id: number;
  isAnswered: boolean;
  updatedAt: string;
  type: number;
}
export interface CustomSectionAnswers {
  id: number;
  content: string;
  selected: boolean;
  updatedAt: string;
}
export interface CustomSectionViewers {
  customSectionId: number;
  id: number;
  userId: string;
}

export interface Project {
  id: any;
  commentsCount: number;
  name: string;
  projectId: string;
  projectPartners: any[];
  partners: any[];
  objective: string;
  successMetrics: string;
  background: string;
  createdAt: string;
  updatedAt: string;
  workingGroup: WorkingGroup[];
  objectiveOwners: any[];
  backgroundOwners: any[];
  timelines: Timeline[];
  createCurrentStep: ProjectStep;
  supportingDocuments: any[];
  insights: string;
  targetSegments: string;
  audienceOwners: any[];
  isApproved: boolean;
  masterParentId: string;
  createdByUserId: number;
  createdBy: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isPrimaryContact: boolean;
    clientId: number;
  };
  isAccepted: boolean;
  parentId: string;
  isConfirmed: boolean;
  editPermissions: string[];
  status: ProjectStatus;
  progress: number;
  budgets: BudgetRecord[];
  customSections: CustomSectionData[];
  subBrief: Project[];
}
export interface ProjectInList {
  createCurrentStep: ProjectStep;
  createdAt: string;
  createdBy: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isPrimaryContact: boolean;
    clientId: string;
  };
  createdByUserId: string;
  id: string;
  isApproved: boolean;
  fullName: string;
  level: number;
  masterParentId: string | null;
  name: string;
  parentId: string | null;
  partners: any[];
  projectId: string;
  status: ProjectStatus;
  subBrief: Project[];
  updatedAt: string;
  workingGroup: WorkingGroup;
}

export interface Timeline {
  milestone: string;
  dueDate: string;
  owner: any | null;
  id: number;
  projectId?: number;
  createdAt?: string;
  updatedAt?: string;
  approver?: any;
  progress?: number;
  status: TimelineStatus;
  commentsCount?: number;
}

export interface UpdateTimeline {
  id: number | string;
  milestone?: string;
  dueDate?: string;
  owner: any | null;
  status?: any;
}

export enum TimelineDocumentApproveStatus {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export interface TimelineDocument extends Omit<any, "raw"> {
  name: string;
  createdAt: string;
  ownerUser: any;
  ownerUserId: number;
  isOwnerDeleted?: boolean;
  approveStatus: TimelineDocumentApproveStatus;
  comment?: string;
  commentsCount: number;
}

export enum TimelineStatus {
  NOT_STARTED = 1,
  DRAFT = 2,
  FINAL = 3,
  COMPLETE = 4,
}
export interface ProjectPartnerBudget {
  id?: number;
  partnerId: number;
  budget: number;
}

export interface BudgetFormValue {
  budgets: [
    {
      id: number;
      budget: number;
    }
  ];
}

export interface BudgetRecord {
  id: number;
  budget: number;
  partner: {
    id: any;
    name: string;
    email: string;
    deletedAt?: string;
    isDeleted?: string;
  };
}
export interface PartnerBudget {
  totalBudget: number;
}
export interface ProjectApproveStatus {
  isApproved: boolean;
  creatorId: number;
}
