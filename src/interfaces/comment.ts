export enum CommentType {
  PROJECT = 'project',
  PROJECT_TIMELINE = 'project_timeline',
  PROJECT_TIMELINE_DOCUMENT = 'project_timeline_document',
}

export interface MentionedUsersDto {
  id: string;
}

export interface CommentDto {
  content: string;
  createdAt: string;
  id: string;
  isUpdated?: boolean;
  level: number;
  masterParentId?: string; // Root comment's id - TBD
  mentionedUsers: string[];
  parentId?: string;
  repliesCount: number;
  sender: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  updatedAt: string;
}
