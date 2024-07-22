import dayjs from "dayjs";
import { TimelineStatus } from "@/interfaces/project";
import { BriefEvent } from "@/calendar/const";

export const startOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const endOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const startOfWeek = (date: Date): Date => {
  const clonedDate = new Date(date.getTime());

  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(clonedDate.setDate(diff));
};

export const endOfWeek = (date: Date): Date => {
  const start = startOfWeek(date);
  return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
};

export const addDays = (date: Date, days: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

export const formatDate = (date: Date): string =>
  dayjs(date).format("YYYY-MM-DD");

export const getDay = (date: Date) => date.toDateString().slice(0, 3);
export const getShortDay = (date: Date) => date.toDateString().slice(0, 1);

export function getTimelineStatus(status: TimelineStatus) {
  switch (status) {
    case TimelineStatus.NOT_STARTED:
      return "not__started";
    case TimelineStatus.FINAL:
      return "final";
    case TimelineStatus.COMPLETE:
      return "complete";
    default:
      return "draft";
  }
}

export const removeDuplicateBriefs = (array: BriefEvent[]): BriefEvent[] => {
  const map = new Map<string, BriefEvent>();
  array.forEach((item) => {
    if (!map.has(item.projectId)) {
      map.set(item.projectId, item);
    }
  });
  return Array.from(map.values());
};
