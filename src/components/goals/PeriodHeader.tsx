import React from 'react';
import { GoalFrequency } from '../../types';
import { getWeekNumber } from '../../utils/dateUtils';

interface PeriodHeaderProps {
  frequency: GoalFrequency;
}

export function PeriodHeader({ frequency }: PeriodHeaderProps) {
  const today = new Date();
  
  const getPeriodInfo = () => {
    switch (frequency) {
      case 'daily':
        return {
          label: 'Today',
          date: today.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })
        };
      case 'weekly':
        return {
          label: 'This Week',
          date: `Week ${getWeekNumber(today)}, ${today.getFullYear()}`
        };
      case 'monthly':
        return {
          label: 'This Month',
          date: today.toLocaleDateString('en-US', { 
            month: 'long',
            year: 'numeric'
          })
        };
    }
  };

  const { label, date } = getPeriodInfo();

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="text-lg font-semibold text-gray-900">{date}</p>
    </div>
  );
}