export interface ApiResponse<T> {
  statusCode?: number;
  data?: T;
}

export interface PaginateResponse<T> {
  statusCode?: number;
  data?: {
    items: T[];
    meta: {
      totalItems?: number;
      itemCount?: number;
      itemsPerPage?: number;
      totalPages?: number;
      currentPage?: number;
    };
  };
}

export enum UserType {
  ADMIN = 1,
  CLIENT = 2,
  GUEST = 3,
}

export interface CommonQueryParams {
  limit?: number;
  page?: number;
  q?: string;
  orderBy?: 'ASC' | 'DESC';
  sortBy?: string;
}

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum PjWorkingGroupConfirmStatus {
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
}

export enum AcceptStatus {
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
}

export enum ProjectStatus {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  COMPLETE = 3,
}

export enum NotificationType {
  NEW_INVITATION = 1,
  NEW_BRIEF = 2,
  NEW_PARTNER = 3,
  REQUEST_JOIN_CLIENT = 4,
  NEW_CLIENT_REQUEST = 5,
  UPDATE_BRIEF = 6,
  NEW_COMMENT = 7,
  NEW_TAG = 8,
  NEW_USER = 9,
  DELETE_BRIEF = 10,
}

export interface NotificationCount {
  notificationtypecount: number;
  type: NotificationType;
}

export enum CRUD {
  CREATE = 1,
  UPDATE = 2,
  READ = 3,
  DELETE = 4,
}

export interface Notifications {
  createdAt: string;
  updatedAt: string;
  id: string;
  receiverId: string;
  senderId: string | null;
  title: string;
  isRead: boolean;
  type: NotificationType;
  content: string;
  others: string;
}

export enum ProjectQuestionType {
  MULTIPLE_CHOICE = 1,
  DROP_DOWN = 2,
  SHORT_ANSWER = 3,
  PARAGRAPH = 4,
  DATE = 5,
  TIME = 6,
  CHECKBOXES = 7,
}
export enum ActionsQuestionType {
  ADD = 1,
  UPDATE = 2,
  DELETE = 3,
}
