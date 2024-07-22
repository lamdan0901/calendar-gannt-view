import { BriefEvent } from "@/calendar/const";
import { removeDuplicateBriefs } from "./helpers";
import data from "@/assets/data.json";

const milestones = data as unknown as BriefEvent[];

export function useBrief(params?: string) {
  if (!params) return milestones;

  return data as unknown as BriefEvent[];
}

export function useBriefList() {
  return removeDuplicateBriefs(milestones).map((m) => ({
    createdByUserId: m.project.createdByUserId,
    value: m.projectId,
    label: m.project.name,
  }));
}

export function useMilestones(projectId?: string) {
  if (!projectId) return [];

  return milestones.map((m) => ({
    value: m.id,
    label: m.milestone,
  }));
}
