import React from 'react';
import { GoalTabs } from './goals/GoalTabs';
import { StatsGrid } from './stats/StatsGrid';
import { GoalStreaks } from './stats/GoalStreaks';
import { CompletionChart } from './stats/CompletionChart';
import { TimeFilter } from './stats/TimeFilter';
import { useGoalStats } from '../hooks/useGoalStats';
import { TimePeriod } from '../types';

export function Dashboard() {
  const [timePeriod, setTimePeriod] = React.useState<TimePeriod>('daily');
  const stats = useGoalStats(timePeriod);

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <GoalTabs />
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Progress Overview</h2>
          <TimeFilter selected={timePeriod} onChange={setTimePeriod} />
        </div>
        
        <div className="space-y-6">
          <StatsGrid stats={stats} period={timePeriod} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GoalStreaks streaks={stats.streaks} period={timePeriod} />
            <CompletionChart completionRates={stats.completionRates} period={timePeriod} />
          </div>
        </div>
      </div>
    </div>
  );
}