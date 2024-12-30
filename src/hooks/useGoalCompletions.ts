import { useState } from 'react';
import { GoalCompletion } from '../types';

export function useGoalCompletions() {
  const [completions, setCompletions] = useState<GoalCompletion[]>([]);

  const addCompletion = (goalId: string, goalTitle: string) => {
    setCompletions(prev => [...prev, {
      id: crypto.randomUUID(),
      goalId,
      goalTitle,
      date: new Date().toISOString()
    }]);
  };

  return {
    completions,
    addCompletion
  };
}