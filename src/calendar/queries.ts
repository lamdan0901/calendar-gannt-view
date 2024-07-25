import { BriefEvent } from "@/calendar/const";
import { removeDuplicateBriefs } from "./helpers";
import data from "@/assets/data.json";

const milestones = data as unknown as BriefEvent[];

export function useBrief(params?: {
  projectId?: string;
  status?: number;
  shouldHideFilteredTimelines?: boolean;
}) {
  if (!params) return milestones;

  const { shouldHideFilteredTimelines, projectId, status } = params;

  return structuredClone(milestones).filter((m) => {
    if (projectId && m.projectId !== projectId) return false;

    if (status) {
      if (shouldHideFilteredTimelines && m.status !== status) {
        m.isHidden = true;
      } else if (m.status !== status) {
        return false;
      }
    }

    return true;
  });
}

export function useBriefList() {
  return removeDuplicateBriefs(milestones).map((m) => ({
    createdByUserId: m.project.createdByUserId,
    value: m.projectId,
    label: m.project.name,
  }));
}
