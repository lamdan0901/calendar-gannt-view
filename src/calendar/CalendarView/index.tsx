import { useBrief, useBriefList, useMilestones } from "@/calendar/queries";
import { DatePicker } from "@/components/Datepicker/DatePicker";
import MonthYearPickerWrapper from "@/components/Datepicker/MonthYearPickerWrapper";
import Select from "@/components/Select";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { parseDate } from "@internationalized/date";
import { useState } from "react";
import {
  Direction,
  StatusOption,
  ViewValue,
  statusOptions,
  viewOptions,
} from "../const";
import { addDays, removeDuplicateBriefs } from "../helpers";
import DayView from "./DayView";
import MonthView from "./MonthView";
import WeekView from "./WeekView";

function Calendar({ isCurrentView }: { isCurrentView: boolean }) {
  const [view, setView] = useState(ViewValue.Month);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusOption | null>(null);

  const [selectedBrief, setSelectedBrief] = useState<{
    value: string;
    label: string;
    createdByUserId: string;
  } | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<{
    value: string;
    label: string;
  } | null>(null);

  function formatBriefParams() {
    const params: Record<string, string> = {};
    if (status) params.status = status.value.toString();
    if (dueDate) params.dueDate = dueDate;
    if (selectedBrief) {
      params.projectId = selectedBrief.value;
    }
    if (selectedMilestone) {
      params.milestoneId = selectedMilestone.value;
    }
    return new URLSearchParams(params).toString();
  }

  const briefs = useBrief(formatBriefParams());
  const briefOptions = useBriefList();
  const milestoneOptions = useMilestones(selectedBrief?.value);

  function clearFilter() {
    setStatus(null);
    setSelectedBrief(null);
    setSelectedMilestone(null);
    setDueDate(null);
  }

  const handleDateChange = (direction: Direction) => {
    let newDate: Date;
    if (view === ViewValue.Month) {
      newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === Direction.Next ? 1 : -1)
      );
    } else if (view === ViewValue.Week) {
      newDate = addDays(currentDate, direction === Direction.Next ? 7 : -7);
    } else {
      newDate = addDays(currentDate, direction === Direction.Next ? 1 : -1);
    }

    setCurrentDate(newDate);
    clearFilter();
  };

  const handleDateClick = (date: Date) => {
    setView(ViewValue.Day);
    setCurrentDate(date);
    clearFilter();
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    clearFilter();
  };

  function handleViewChange(newValue: any) {
    setView(newValue.value);
    clearFilter();
  }

  const renderView = () => {
    switch (view) {
      case ViewValue.Month:
        return (
          <MonthView
            date={currentDate}
            events={briefs}
            onDateClick={handleDateClick}
          />
        );
      case ViewValue.Week:
        return (
          <WeekView
            date={currentDate}
            events={briefs}
            onDateClick={handleDateClick}
          />
        );
      case ViewValue.Day:
        return (
          <DayView date={currentDate} events={briefs} onEventClick={() => {}} />
        );
    }
  };

  return (
    <div style={{ display: isCurrentView ? "block" : "none" }}>
      <header className="calendar__header">
        <Box
          display={"flex"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={"10px"}
        >
          <MonthYearPickerWrapper
            currentDate={currentDate}
            onChange={(date) => {
              setCurrentDate(date);
              clearFilter();
            }}
          />
          <Button
            colorScheme="gray"
            variant="ghost"
            sx={{
              color: "black",
              border: "1px solid #A6A9B0",
              fontWeight: "400",
              bgColor: "white",
            }}
            onClick={() => handleDateChange(Direction.Prev)}
          >
            <ChevronLeftIcon w={6} h={6} />
          </Button>
          <Button
            colorScheme="gray"
            variant="ghost"
            sx={{
              color: "black",
              border: "1px solid #A6A9B0",
              fontWeight: "400",
              bgColor: "white",
            }}
            onClick={() => handleDateChange(Direction.Next)}
          >
            <ChevronRightIcon w={6} h={6} />
          </Button>
          <Button
            colorScheme="gray"
            sx={{
              color: "black",
              border: "1px solid #A6A9B0",
              fontWeight: "400",
              bgColor: "white",
            }}
            variant="ghost"
            onClick={goToToday}
          >
            Today
          </Button>
          <Box w="135px">
            <Select
              isSearchable={false}
              size="md"
              options={viewOptions}
              value={viewOptions.find((v) => v.value === view)}
              onChange={handleViewChange}
            />
          </Box>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={"10px"}
        >
          <Box minW="188px">
            <Select
              isSearchable
              size="md"
              options={briefOptions}
              placeholder="Select a brief"
              value={selectedBrief}
              onChange={(newValue: any) => {
                setSelectedMilestone(null);
                setSelectedBrief(newValue);
              }}
            />
          </Box>
          <Box minW="210px">
            <Select
              isSearchable={false}
              size="md"
              options={milestoneOptions}
              placeholder="Select a milestone"
              value={selectedMilestone}
              onChange={(newValue: any) => {
                setSelectedMilestone(newValue);
              }}
              isDisabled={!selectedBrief}
            />
          </Box>
          <Box width="136px">
            <DatePicker
              aria-label="date-input"
              minW="136px"
              value={dueDate ? parseDate(dueDate.split("T")[0]) : (null as any)}
              onChange={(value) => setDueDate(value?.toString() || null)}
              showLabel={false}
              size="sm"
              placeholder="Due Date"
              isDisabled={!selectedBrief}
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
          <Button onClick={clearFilter} flexShrink={0}>
            Clear filter
          </Button>
        </Box>
      </header>

      {renderView()}
    </div>
  );
}

export default Calendar;
