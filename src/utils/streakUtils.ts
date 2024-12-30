import { TimePeriod } from '../types';
import { isSameDay, isSameWeek, isSameMonth } from './dateUtils';

interface StreakResult {
  currentStreak: number;
  bestStreak: number;
}

function getComparisonFunction(period: TimePeriod) {
  switch (period) {
    case 'daily':
      return isSameDay;
    case 'weekly':
      return isSameWeek;
    case 'monthly':
      return isSameMonth;
  }
}

export function calculateStreak(dates: Date[], period: TimePeriod): StreakResult {
  if (dates.length === 0) return { currentStreak: 0, bestStreak: 0 };

  const compareFunc = getComparisonFunction(period);
  const sortedDates = [...dates].sort((a, b) => b.getTime() - a.getTime());
  
  let currentStreak = 1;
  let bestStreak = 1;
  let tempStreak = 1;
  
  const today = new Date();
  
  // Check if the most recent completion is in the current period
  if (!compareFunc(sortedDates[0], today)) {
    currentStreak = 0;
  }

  for (let i = 1; i < sortedDates.length; i++) {
    const current = sortedDates[i];
    const prev = sortedDates[i - 1];
    
    if (compareFunc(current, prev)) {
      tempStreak++;
      if (tempStreak > bestStreak) {
        bestStreak = tempStreak;
      }
      if (compareFunc(current, today)) {
        currentStreak = tempStreak;
      }
    } else {
      tempStreak = 1;
    }
  }

  return { currentStreak, bestStreak };
}