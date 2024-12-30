import React from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { useCalendar } from '../../hooks/useCalendar';

export function Calendar() {
  const { 
    currentDate,
    selectedDate,
    setSelectedDate,
    previousMonth,
    nextMonth
  } = useCalendar();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevMonth={previousMonth}
        onNextMonth={nextMonth}
      />
      <CalendarGrid 
        currentDate={currentDate}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
    </div>
  );
}