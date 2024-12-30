import React from 'react';
import { TimePeriod } from '../../types';

interface TimeFilterProps {
  selected: TimePeriod;
  onChange: (period: TimePeriod) => void;
}

export function TimeFilter({ selected, onChange }: TimeFilterProps) {
  const periods: { label: string; value: TimePeriod }[] = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  return (
    <div className="inline-flex bg-gray-100 rounded-lg p-1">
      {periods.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${selected === value 
              ? 'bg-white text-pink-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}