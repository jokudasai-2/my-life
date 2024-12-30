import React, { useState } from 'react';
import { StatsHeader } from './StatsHeader';
import { StatsGrid } from './StatsGrid';
import { GoalStreaks } from './GoalStreaks';
import { CompletionChart } from './CompletionChart';
import { TimeFilter } from './TimeFilter';
import { useGoalStats } from '../../hooks/useGoalStats';
import { TimePeriod } from '../../types';

export function StatsPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('daily');
  const stats = useGoalStats(timePeriod);
  
  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <StatsHeader />
        <TimeFilter selected={timePeriod} onChange={setTimePeriod} />
      </div>
      <StatsGrid stats={stats} period={timePeriod} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GoalStreaks streaks={stats.streaks} period={timePeriod} />
        <CompletionChart completionRates={stats.completionRates} period={timePeriod} />
      </div>
    </div>
  );
}