import { TIMELINE_STATUS_LABEL } from "@/constants/project";
import { TimelineStatus } from "@/interfaces/project";

export type TSelectedBrief = {
  value: string;
  label: string;
  createdByUserId: string;
};

export interface CalendarEvent {
  id: number;
  title: string;
  dueDate: Date;
  status: TimelineStatus;
  code: string;
  description: string;
}

export interface BriefEvent {
  id: number;
  milestone: string;
  startDate: string;
  dueDate: string;
  projectId: string;
  progress: number;
  status: TimelineStatus;
  ownerUserId: string;
  clientId: string;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
  };
  project: {
    createdByUserId: string;
    name: string;
    id: string;
    createdAt: string;
    timelines: { id: number; projectId: string }[];
  };
  //extra
  width?: number;
  marginLeft?: number;
  isHidden?: boolean;
}

export type TimelineStatusText =
  | "not__started"
  | "final"
  | "complete"
  | "draft";

export type ViewOption = {
  label: string;
  value: ViewValue.Month | ViewValue.Week | ViewValue.Day;
};

export type StatusOption = {
  label: string;
  value: TimelineStatus;
};

export type Milestone = Record<BriefEvent["projectId"], BriefEvent[]>;

export enum ViewValue {
  Day,
  Week,
  Month,
}

export enum Direction {
  Next,
  Prev,
}

export const statusOptions: StatusOption[] = [
  {
    label: TIMELINE_STATUS_LABEL.NOT_STARTED,
    value: TimelineStatus.NOT_STARTED,
  },
  {
    label: TIMELINE_STATUS_LABEL.DRAFT,
    value: TimelineStatus.DRAFT,
  },
  {
    label: TIMELINE_STATUS_LABEL.FINAL,
    value: TimelineStatus.FINAL,
  },
  {
    label: TIMELINE_STATUS_LABEL.COMPLETE,
    value: TimelineStatus.COMPLETE,
  },
];

export const viewOptions: ViewOption[] = [
  {
    label: "Day",
    value: ViewValue.Day,
  },
  {
    label: "Week",
    value: ViewValue.Week,
  },
  {
    label: "Month",
    value: ViewValue.Month,
  },
];

export const daysArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// GanntView

export enum GanntViewValue {
  Day,
  Week,
  Month,
  Quarter,
}

export type GanttViewOption = {
  label: string;
  value:
    | GanntViewValue.Month
    | GanntViewValue.Week
    | GanntViewValue.Day
    | GanntViewValue.Quarter;
};

export const ganttViewOptions: GanttViewOption[] = [
  {
    label: "Day",
    value: GanntViewValue.Day,
  },
  {
    label: "Week",
    value: GanntViewValue.Week,
  },
  {
    label: "Month",
    value: GanntViewValue.Month,
  },
  {
    label: "Quarter",
    value: GanntViewValue.Quarter,
  },
];

export const MIN_NUM_OF_DAYS__DAY = 56; // -> 56 days 8 weeks
export const MIN_NUM_OF_DAYS__WEEK = 84; // -> 84 days 12 weeks
export const MIN_NUM_OF_DAYS__MONTH = 300; // -> 300 days 10 months
export const MIN_NUM_OF_DAYS__QUARTER = 540; // -> 540 days 18 months 6 quarters
