import { Box, Button, HStack } from "@chakra-ui/react";
import Select from "@/components/Select";
import {
  BriefEvent,
  GanntViewValue,
  ganttViewOptions,
  StatusOption,
  statusOptions,
} from "@/calendar/const";
import { DayView } from "@/calendar/GanttView/DayView";
import { MonthView } from "@/calendar/GanttView/MonthView";
import { QuarterView } from "@/calendar/GanttView/QuarterView";
import { WeekView } from "@/calendar/GanttView/WeekView";
import { removeDuplicateBriefs } from "@/calendar/helpers";
import { useBrief } from "@/calendar/queries";
import { useMemo, useState } from "react";

export function GanttView({ isCurrentView }: { isCurrentView: boolean }) {
  const [view, setView] = useState(GanntViewValue.Day);
  const [status, setStatus] = useState<StatusOption | null>(null);

  const [selectedBrief, setSelectedBrief] = useState<{
    value: string;
    label: string;
    createdByUserId: string;
  } | null>(null);

  function formatBriefParams() {
    let searchParams = "from=infinite";

    if (selectedBrief) {
      searchParams = `&projectId=${selectedBrief.value}`;
    }
    if (status) searchParams += `&status=${status.value.toString()}`;

    return searchParams;
  }

  const briefList = useBrief();
  const briefs = useBrief(formatBriefParams());

  const groupedTimelines = useMemo(() => {
    return (briefs ?? [])?.reduce((acc, milestone) => {
      acc[milestone.projectId] = [
        ...(acc[milestone.projectId] ?? []),
        milestone,
      ];
      return acc;
    }, {} as Record<string, BriefEvent[]>);
  }, [briefs]);

  const briefOptions = removeDuplicateBriefs(briefList ?? [])?.map((brief) => ({
    createdByUserId: brief.project.createdByUserId,
    value: brief.projectId,
    label: brief.project.name,
  }));

  function clearFilter() {
    setStatus(null);
    setSelectedBrief(null);
  }

  const renderView = () => {
    if (!selectedBrief?.value) return null;

    const selectedGroup = groupedTimelines[selectedBrief.value]?.sort(
      (t1, t2) =>
        new Date(t1.dueDate).getTime() - new Date(t2.dueDate).getTime()
    );

    const startDate = new Date(selectedGroup?.[0]?.project?.createdAt);
    startDate?.setHours(0, 0, 0, 0);

    const endDate = new Date(
      selectedGroup?.reduce((oldest, current) => {
        return current.dueDate > oldest ? current.dueDate : oldest;
      }, selectedGroup[0].dueDate)
    );
    endDate?.setHours(0, 0, 0, 0);

    const timelines = selectedGroup?.map((t, i) => {
      if (i === 0) return { ...t, startDate: startDate.toISOString() };
      return {
        ...t,
        startDate: selectedGroup[i - 1].dueDate,
      };
    });

    switch (view) {
      case GanntViewValue.Quarter:
        return (
          <QuarterView
            startDate={startDate}
            endDate={endDate}
            timelines={timelines}
          />
        );
      case GanntViewValue.Month:
        return (
          <MonthView
            startDate={startDate}
            endDate={endDate}
            timelines={timelines}
          />
        );
      case GanntViewValue.Week:
        return (
          <WeekView
            startDate={startDate}
            endDate={endDate}
            timelines={timelines}
          />
        );
      case GanntViewValue.Day:
        return (
          <DayView
            startDate={startDate}
            endDate={endDate}
            timelines={timelines}
          />
        );
    }
  };

  return (
    <Box overflow={"auto"} display={isCurrentView ? "block" : "none"}>
      <header className="calendar__header">
        <Box w="135px">
          <Select
            isSearchable={false}
            size="md"
            options={ganttViewOptions}
            value={ganttViewOptions.find((v) => v.value === view)}
            onChange={(v: any) => setView(v.value as GanntViewValue)}
          />
        </Box>
        <HStack alignItems={"center"} flexWrap={"wrap"} gap={"10px"}>
          <Box minW="300px">
            <Select
              isSearchable
              size="md"
              options={briefOptions}
              placeholder="Select a brief"
              value={selectedBrief}
              onChange={(newValue: any) => {
                setSelectedBrief(newValue);
              }}
            />
          </Box>
          <Box minW="148px">
            <Select
              isSearchable={false}
              isDisabled={!selectedBrief}
              size="md"
              options={statusOptions}
              placeholder="Status"
              value={status}
              onChange={(newValue: any) => {
                setStatus(newValue);
              }}
            />
          </Box>
          <Button
            onClick={clearFilter}
            disabled={!selectedBrief}
            flexShrink={0}
          >
            Clear filter
          </Button>
        </HStack>
      </header>

      {renderView()}
    </Box>
  );
}
