import React from 'react';
import { CompletionRate, TimePeriod } from '../../types';

interface CompletionChartProps {
  completionRates: CompletionRate[];
  period: TimePeriod;
}

export function CompletionChart({ completionRates, period }: CompletionChartProps) {
  const maxRate = Math.max(...completionRates.map(rate => rate.rate));
  const title = `${period.charAt(0).toUpperCase() + period.slice(1)} Completion Rates`;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="h-48 flex items-end space-x-2">
        {completionRates.map((rate) => (
          <div
            key={rate.period}
            className="flex-1 flex flex-col items-center"
          >
            <div
              className="w-full bg-pink-200 rounded-t transition-all duration-300"
              style={{
                height: `${(rate.rate / maxRate) * 100}%`,
                minHeight: '4px'
              }}
            />
            <div className="mt-2 text-xs text-gray-600 rotate-45 origin-left truncate max-w-[100px]">
              {rate.period}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}