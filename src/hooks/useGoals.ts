import { useState, useEffect } from 'react';
import { Goal, GoalFrequency } from '../types';

const initialGoalsByFrequency: Record<GoalFrequency, Goal[]> = {
  daily: [
    {
      id: '1',
      title: 'Drink 2L of water',
      category: 'health',
      target: '2',
      progress: 1.5,
      frequency: 'daily',
      unit: 'liters',
      completed: false
    },
    {
      id: '2',
      title: 'Meditate',
      category: 'mental',
      target: '1',
      progress: 0,
      frequency: 'daily',
      unit: 'count',
      completed: false
    }
  ],
  weekly: [
    {
      id: '3',
      title: 'Exercise sessions',
      category: 'fitness',
      target: '3',
      progress: 1,
      frequency: 'weekly',
      unit: 'count',
      completed: false
    }
  ],
  monthly: [
    {
      id: '4',
      title: 'Read books',
      category: 'mental',
      target: '2',
      progress: 0,
      frequency: 'monthly',
      unit: 'count',
      completed: false
    }
  ]
};

export function useGoals(frequency: GoalFrequency) {
  const [goals, setGoals] = useState<Goal[]>(initialGoalsByFrequency[frequency]);

  useEffect(() => {
    setGoals(initialGoalsByFrequency[frequency]);
  }, [frequency]);

  const updateGoal = (updatedGoal: Goal) => {
    setGoals(currentGoals =>
      currentGoals.map(goal =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      )
    );
  };

  const addGoal = (newGoal: Goal) => {
    setGoals(currentGoals => [...currentGoals, newGoal]);
  };

  return {
    goals,
    updateGoal,
    addGoal
  };
}