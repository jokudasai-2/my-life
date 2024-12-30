import React, { useState } from 'react';
import { Goal, GoalFrequency } from '../../types';
import { GoalItem } from './GoalItem';
import { GoalModal } from './GoalModal';
import { PeriodHeader } from './PeriodHeader';
import { useGoals } from '../../hooks/useGoals';

interface GoalsListProps {
  frequency: GoalFrequency;
}

export function GoalsList({ frequency }: GoalsListProps) {
  const { goals, updateGoal, addGoal } = useGoals(frequency);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIncrement = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      const newProgress = goal.progress + 1;
      const targetValue = parseInt(goal.target);
      updateGoal({
        ...goal,
        progress: newProgress,
        completed: newProgress >= targetValue
      });
    }
  };

  const handleDecrement = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal && goal.progress > 0) {
      const newProgress = goal.progress - 1;
      const targetValue = parseInt(goal.target);
      updateGoal({
        ...goal,
        progress: newProgress,
        completed: newProgress >= targetValue
      });
    }
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleSave = (updatedGoal: Goal) => {
    if (editingGoal) {
      updateGoal(updatedGoal);
    } else {
      addGoal(updatedGoal);
    }
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            {frequency.charAt(0).toUpperCase() + frequency.slice(1)} Goals
          </h2>
          <PeriodHeader frequency={frequency} />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
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
            onDecrement={() => handleDecrement(goal.id)}
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
        frequency={frequency}
      />
    </div>
  );
}