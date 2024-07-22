import React, { useEffect, useRef, useState } from "react";
import MonthYearPicker from "./MonthYearPicker";
import { Button, useOutsideClick } from "@chakra-ui/react";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

interface MonthYearPickerWrapperProps {
  currentDate: Date;
  onChange: (date: Date) => void;
}

function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

const MonthYearPickerWrapper = ({
  currentDate,
  onChange,
}: MonthYearPickerWrapperProps) => {
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [showPicker, setShowPicker] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMonthYearChange = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setShowPicker(false);
    onChange(new Date(year, month));
  };

  const togglePicker = () => setShowPicker(!showPicker);

  useOutsideClick({
    ref: ref,
    handler: () => setShowPicker(false),
  });

  useEffect(() => {
    setSelectedYear(currentDate.getFullYear());
    setSelectedMonth(currentDate.getMonth());
  }, [currentDate]);

  return (
    <div ref={ref} className="month-year-picker-wrapper">
      <Button onClick={togglePicker}>
        {capitalizeFirstLetter(`${months[selectedMonth]} ${selectedYear}`)}
      </Button>
      {showPicker && (
        <MonthYearPicker
          initialYear={selectedYear}
          initialMonth={selectedMonth}
          onChange={handleMonthYearChange}
        />
      )}
    </div>
  );
};

export default MonthYearPickerWrapper;
