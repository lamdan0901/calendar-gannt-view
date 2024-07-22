import { PjWorkingGroupConfirmStatus } from 'interfaces/common';
import { RelationshipStatus } from 'interfaces/partner';
import { ProjectStatus } from 'interfaces/project';

export const PROJECT_CONFIRM_STATUS_OPTIONS = [
  {
    name: 'Accepted',
    id: PjWorkingGroupConfirmStatus.ACCEPTED,
  },
  {
    name: 'Pending',
    id: PjWorkingGroupConfirmStatus.PENDING,
  },
  {
    name: 'Rejected',
    id: PjWorkingGroupConfirmStatus.REJECTED,
  },
];

export const formatProjectConfirmStatus = (
  status: PjWorkingGroupConfirmStatus,
) => {
  return PROJECT_CONFIRM_STATUS_OPTIONS.find((item) => item.id === status)
    ?.name;
};

export const PROJECT_STATUS_OPTIONS = [
  { value: 0, label: 'All' },
  { value: ProjectStatus.NOT_STARTED, label: 'Not Started', color: 'gray' },
  { value: ProjectStatus.IN_PROGRESS, label: 'In Progress', color: 'blue' },
  { value: ProjectStatus.COMPLETE, label: 'Completed', color: 'green' },
];

export const formatProjectStatus = (status: ProjectStatus | undefined) => {
  return PROJECT_STATUS_OPTIONS.find((option) => option.value === status);
};

export const getProjectStatusName = (status: ProjectStatus | undefined) => {
  return formatProjectStatus(status)?.label;
};

export const RELATIONSHIP_STATUS_OPTIONS = [
  {
    value: RelationshipStatus.ACCEPTED,
    label: 'Partner',
    color: '#0096EB',
    bg: '#2baaed1a',
  },
  {
    value: RelationshipStatus.INVITED,
    label: 'Invited',
    color: '#8F8F8F',
    bg: '#dcdcdc59',
  },
  {
    value: RelationshipStatus.RECEIVED,
    label: 'Received',
    bg: '#fab9131a',
    color: '#fab913',
  },
];

export const formatRelationshipStatus = (status: RelationshipStatus) => {
  return RELATIONSHIP_STATUS_OPTIONS.find((option) => option.value === status);
};
