import React from 'react';
import { GoalCompletion } from '../../types';
import { CheckCircle2, Star } from 'lucide-react';

interface CalendarDayProps {
  date: Date;
  isSelected: boolean;
  completions: GoalCompletion[];
  totalGoals: number;
  onSelect: () => void;
}

export function CalendarDay({ date, isSelected, completions, totalGoals, onSelect }: CalendarDayProps) {
  const isToday = new Date().toDateString() === date.toDateString();
  const allGoalsCompleted = completions.length >= totalGoals && totalGoals > 0;

  return (
    <button
      onClick={onSelect}
      className={`
        h-20 p-2 flex flex-col items-start justify-between rounded-lg transition-colors relative
        ${isSelected ? 'bg-pink-50 border-2 border-pink-500' : 'hover:bg-gray-50'}
        ${isToday ? 'font-bold' : ''}
      `}
    >
      <div className="flex justify-between w-full">
        <span className={`text-sm ${isToday ? 'text-pink-600' : 'text-gray-700'}`}>
          {date.getDate()}
        </span>
        {allGoalsCompleted && (
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        )}
      </div>
      {completions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {completions.map(completion => (
            <CheckCircle2
              key={completion.id}
              className="w-4 h-4 text-green-500"
              title={completion.goalTitle}
            />
          ))}
        </div>
      )}
    </button>
  );
}