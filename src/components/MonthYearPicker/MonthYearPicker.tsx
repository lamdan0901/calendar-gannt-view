import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { CalendarButton } from './Button';

const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

interface MonthYearPickerProps {
  initialYear: number;
  initialMonth: number;
  onChange: (year: number, month: number) => void;
}

const MonthYearPicker = ({
  onChange,
  initialYear,
  initialMonth,
}: MonthYearPickerProps) => {
  const [year, setYear] = useState(initialYear);
  const [currentMonth, setMonth] = useState(initialMonth);

  const handleYearChange = (direction: 'prev' | 'next') => {
    setYear(year + (direction === 'next' ? 1 : -1));
  };

  const handleMonthSelect = (month: number) => {
    setMonth(month);
    onChange(year, month);
  };

  return (
    <div className="month-picker">
      <Box
        display="flex"
        alignItems="center"
        paddingInline={'10'}
        paddingBottom="4"
      >
        <CalendarButton onClick={() => handleYearChange('prev')}>
          <ChevronLeftIcon w={6} h={6} />
        </CalendarButton>
        <Heading as="h2" size="sm" flex="1" textAlign="center" fontWeight={500}>
          {year}
        </Heading>
        <CalendarButton onClick={() => handleYearChange('next')}>
          <ChevronRightIcon w={6} h={6} />
        </CalendarButton>
      </Box>
      <div className="months-grid">
        {months.map((month, index) => (
          <div
            key={month}
            className={`month-grid__item ${
              index === currentMonth ? 'selected' : ''
            }`}
            onClick={() => handleMonthSelect(index)}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthYearPicker;
