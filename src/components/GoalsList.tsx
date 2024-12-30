import React, { useState } from 'react';
import { Goal } from '../types';
import { GoalItem } from './GoalItem';
import { GoalModal } from './GoalModal';

const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Exercise 3 times per week',
    category: 'fitness',
    target: '3 sessions',
    progress: 2,
    completed: false
  },
  {
    id: '2',
    title: 'Drink 2L of water daily',
    category: 'health',
    target: '2L',
    progress: 1.5,
    completed: false
  },
  {
    id: '3',
    title: 'Meditate for 10 minutes daily',
    category: 'mental',
    target: '10 min',
    progress: 10,
    completed: true
  }
];

export function GoalsList() {
  const [goals, setGoals] = useState(initialGoals);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIncrement = (goalId: string) => {
    setGoals(currentGoals =>
      currentGoals.map(goal => {
        if (goal.id === goalId) {
          const newProgress = goal.progress + 1;
          const targetValue = parseInt(goal.target);
          return {
            ...goal,
            progress: newProgress,
            completed: newProgress >= targetValue
          };
        }
        return goal;
      })
    );
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleSave = (updatedGoal: Goal) => {
    setGoals(currentGoals =>
      currentGoals.map(goal =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      )
    );
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Current Goals</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Goal
        </button>
      </div>
      <div className="space-y-4">
        {goals.map((goal) => (
          <GoalItem 
            key={goal.id} 
            goal={goal} 
            onIncrement={() => handleIncrement(goal.id)}
            onEdit={() => handleEdit(goal)}
          />
        ))}
      </div>
      
      <GoalModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingGoal(null);
        }}
        onSave={handleSave}
        goal={editingGoal}
      />
    </div>
  );
}