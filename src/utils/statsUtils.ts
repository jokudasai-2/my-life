import { TimePeriod } from '../types';

export function getDateRangeForPeriod(period: TimePeriod) {
  const endDate = new Date();
  const startDate = new Date();

  switch (period) {
    case 'daily':
      startDate.setDate(endDate.getDate() - 7); // Last 7 days
      break;
    case 'weekly':
      startDate.setDate(endDate.getDate() - 28); // Last 4 weeks
      break;
    case 'monthly':
      startDate.setMonth(endDate.getMonth() - 3); // Last 3 months
      break;
  }

  return { startDate, endDate };
}

export function calculateStreakForPeriod(completions: any[], period: TimePeriod) {
  // This would contain actual streak calculation logic based on the period
  return {
    currentStreak: completions.length,
    bestStreak: completions.length
  };
}

export function calculateCompletionRateForPeriod(completions: any[], period: TimePeriod) {
  const { startDate, endDate } = getDateRangeForPeriod(period);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysWithCompletions = new Set(
    completions.map(c => new Date(c.date).toDateString())
  ).size;

  return Math.round((daysWithCompletions / totalDays) * 100);
}