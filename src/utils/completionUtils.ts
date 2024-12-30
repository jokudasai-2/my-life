import { TimePeriod, CompletionRate } from '../types';
import { getWeekNumber, getMonthKey } from './dateUtils';

export function calculateCompletionRates(
  completions: { date: string }[],
  period: TimePeriod,
  numberOfPeriods = 4
): CompletionRate[] {
  const dates = completions.map(c => new Date(c.date));
  const now = new Date();
  
  switch (period) {
    case 'daily':
      return calculateDailyRates(dates, numberOfPeriods);
    case 'weekly':
      return calculateWeeklyRates(dates, numberOfPeriods);
    case 'monthly':
      return calculateMonthlyRates(dates, numberOfPeriods);
  }
}

function calculateDailyRates(dates: Date[], numberOfDays: number): CompletionRate[] {
  const rates: CompletionRate[] = [];
  const today = new Date();
  
  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const completionsForDay = dates.filter(d => 
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    ).length;
    
    rates.unshift({
      period: date.toLocaleDateString(),
      rate: completionsForDay
    });
  }
  
  return rates;
}

function calculateWeeklyRates(dates: Date[], numberOfWeeks: number): CompletionRate[] {
  const rates: CompletionRate[] = [];
  const today = new Date();
  const currentWeek = getWeekNumber(today);
  
  for (let i = 0; i < numberOfWeeks; i++) {
    const weekNum = currentWeek - i;
    const completionsForWeek = dates.filter(d => 
      getWeekNumber(d) === weekNum &&
      d.getFullYear() === today.getFullYear()
    ).length;
    
    rates.unshift({
      period: `Week ${weekNum}`,
      rate: completionsForWeek
    });
  }
  
  return rates;
}

function calculateMonthlyRates(dates: Date[], numberOfMonths: number): CompletionRate[] {
  const rates: CompletionRate[] = [];
  const today = new Date();
  
  for (let i = 0; i < numberOfMonths; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i);
    const monthKey = getMonthKey(date);
    
    const completionsForMonth = dates.filter(d => 
      getMonthKey(d) === monthKey
    ).length;
    
    rates.unshift({
      period: date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
      rate: completionsForMonth
    });
  }
  
  return rates;
}