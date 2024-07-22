import { ProjectUser } from './user';

export interface UploadedFile {
  id?: number;
  name: string;
  filePath?: string;
  type: string | any;
  size: number;
  createdAt?: string;
  updatedAt?: string;
  uploadedBy?: ProjectUser;
  raw?: File;
}
