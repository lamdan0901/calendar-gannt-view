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

  function getViewProps() {
    if (!briefList?.length || !briefs?.length) return null;

    let startDate: Date;
    let endDate: Date;
    let timelineGroups: Record<string, BriefEvent[]> = {};

    timelineGroups = selectedBrief?.value
      ? {
          [selectedBrief.value]: groupedTimelines[selectedBrief.value],
        }
      : groupedTimelines;

    const selectedTimelineGroups = Object.values(timelineGroups);

    selectedTimelineGroups.forEach((timelineGroup) =>
      timelineGroup?.sort(
        (t1, t2) =>
          new Date(t1.dueDate).getTime() - new Date(t2.dueDate).getTime()
      )
    );

    const sortedTimelines = selectedTimelineGroups
      .flat()
      .sort(
        (t1, t2) =>
          new Date(t1.dueDate).getTime() - new Date(t2.dueDate).getTime()
      );

    startDate = new Date(sortedTimelines[0].project.createdAt);
    startDate?.setHours(0, 0, 0, 0);

    endDate = new Date(sortedTimelines.at(-1)!.dueDate);
    endDate?.setHours(0, 0, 0, 0);

    selectedTimelineGroups.forEach((group) => {
      const timelineStartD = new Date(group[0].project.createdAt);
      timelineStartD.setHours(0, 0, 0, 0);

      group.forEach((t, i) => {
        t.startDate =
          i === 0 ? timelineStartD.toISOString() : group[i - 1].dueDate;
      });
    });

    return { timelineGroups, startDate, endDate };
  }

  const renderView = () => {
    const props = getViewProps();
    if (!props) return null;

    switch (view) {
      case GanntViewValue.Quarter:
        return <QuarterView {...props} />;
      case GanntViewValue.Month:
        return <MonthView {...props} />;
      case GanntViewValue.Week:
        return <WeekView {...props} />;
      case GanntViewValue.Day:
        return <DayView {...props} />;
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
