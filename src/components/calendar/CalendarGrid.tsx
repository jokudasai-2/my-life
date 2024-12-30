import React from 'react';
import { CalendarDay } from './CalendarDay';
import { getDaysInMonth, isSameDay } from '../../utils/dateUtils';
import { useGoalCompletions } from '../../hooks/useGoalCompletions';
import { useGoals } from '../../hooks/useGoals';

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarGrid({ currentDate, selectedDate, onSelectDate }: CalendarGridProps) {
  const { completions } = useGoalCompletions();
  const { goals } = useGoals('daily');
  const days = getDaysInMonth(currentDate);

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-sm text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date) => (
          <CalendarDay
            key={date.toISOString()}
            date={date}
            isSelected={isSameDay(date, selectedDate)}
            completions={completions.filter(c => isSameDay(new Date(c.date), date))}
            totalGoals={goals.length}
            onSelect={() => onSelectDate(date)}
          />
        ))}
      </div>
    </div>
  );
}