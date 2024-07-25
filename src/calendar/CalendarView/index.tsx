import { useBrief, useBriefList } from "@/calendar/queries";
import MonthYearPickerWrapper from "@/components/MonthYearPicker/MonthYearPickerWrapper";
import Select from "@/components/Select";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import {
  Direction,
  StatusOption,
  TSelectedBrief,
  ViewOption,
  ViewValue,
  statusOptions,
  viewOptions,
} from "../const";
import { addDays } from "../helpers";
import DayView from "./DayView";
import MonthView from "./MonthView";
import WeekView from "./WeekView";

function Calendar({ isCurrentView }: { isCurrentView: boolean }) {
  const [view, setView] = useState(ViewValue.Month);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [status, setStatus] = useState<StatusOption | null>(null);
  const [selectedBrief, setSelectedBrief] = useState<TSelectedBrief | null>(
    null
  );

  const briefOptions = useBriefList();
  const briefs = useBrief({
    status: status?.value,
    projectId: selectedBrief?.value,
  });

  function clearFilter() {
    setStatus(null);
    setSelectedBrief(null);
  }

  const handleDateChange = (direction: Direction) => {
    let newDate: Date;

    switch (view) {
      case ViewValue.Month:
        newDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + (direction === Direction.Next ? 1 : -1)
        );
        break;
      case ViewValue.Week:
        newDate = addDays(currentDate, direction === Direction.Next ? 7 : -7);
        break;
      case ViewValue.Day:
        newDate = addDays(currentDate, direction === Direction.Next ? 1 : -1);
        break;
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

  function handleViewChange(newValue: ViewOption) {
    setView(newValue.value);
    clearFilter();
  }

  const renderView = () => {
    const props = {
      date: currentDate,
      events: briefs,
      onDateClick: handleDateClick,
    };

    switch (view) {
      case ViewValue.Month:
        return <MonthView {...props} />;
      case ViewValue.Week:
        return <WeekView {...props} />;
      case ViewValue.Day:
        return <DayView {...props} />;
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
          <Box minW="300px">
            <Select
              isSearchable
              size="md"
              options={briefOptions}
              isClearable
              placeholder="Select a brief"
              value={selectedBrief}
              onChange={(newValue: TSelectedBrief) => {
                setSelectedBrief(newValue);
              }}
            />
          </Box>
          <Box minW="148px">
            <Select
              isSearchable={false}
              isClearable
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
