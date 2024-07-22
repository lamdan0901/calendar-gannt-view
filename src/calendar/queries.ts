import { BriefEvent } from "@/calendar/const";
import data from "@/assets/data.json";

export function useBrief(params?: string) {
  if (!params) return [];

  return data as unknown as BriefEvent[];
}
