import { useMemo } from 'react';
import { useGoals } from './useGoals';
import { useGoalCompletions } from './useGoalCompletions';
import { GoalStats, TimePeriod } from '../types';
import { getDateRangeForPeriod } from '../utils/statsUtils';
import { calculateStreak } from '../utils/streakUtils';
import { calculateCompletionRates } from '../utils/completionUtils';

export function useGoalStats(period: TimePeriod): GoalStats {
  const { goals } = useGoals(period);
  const { completions } = useGoalCompletions();

  return useMemo(() => {
    const { startDate, endDate } = getDateRangeForPeriod(period);
    const periodCompletions = completions.filter(c => {
      const date = new Date(c.date);
      return date >= startDate && date <= endDate;
    });

    const completionDates = periodCompletions.map(c => new Date(c.date));
    const { currentStreak, bestStreak } = calculateStreak(completionDates, period);

    const streaks = goals.map(goal => {
      const goalCompletions = periodCompletions
        .filter(c => c.goalId === goal.id)
        .map(c => new Date(c.date));
      
      const { currentStreak: current, bestStreak: best } = calculateStreak(goalCompletions, period);
      return {
        goalId: goal.id,
        goalTitle: goal.title,
        current,
        best
      };
    });

    const completionRates = calculateCompletionRates(periodCompletions, period);

    return {
      totalCompleted: periodCompletions.length,
      currentStreak,
      bestStreak,
      completionRate: (completionRates.reduce((sum, rate) => sum + rate.rate, 0) / completionRates.length) * 100,
      streaks,
      completionRates,
      period
    };
  }, [goals, completions, period]);
}