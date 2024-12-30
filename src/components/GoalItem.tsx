import React from 'react';
import { CheckCircle2, Circle, Plus, Pencil } from 'lucide-react';
import { Goal } from '../types';
import { ProgressBar } from './ProgressBar';

interface GoalItemProps {
  goal: Goal;
  onIncrement: () => void;
  onEdit: () => void;
}

export function GoalItem({ goal, onIncrement, onEdit }: GoalItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        {goal.completed ? (
          <CheckCircle2 className="text-green-500" />
        ) : (
          <Circle className="text-gray-400" />
        )}
        <div>
          <h3 className="font-medium">{goal.title}</h3>
          <p className="text-sm text-gray-600">
            Progress: {goal.progress} / {goal.target}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onEdit}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Edit goal"
        >
          <Pencil className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={onIncrement}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Increment progress"
        >
          <Plus className="w-5 h-5 text-indigo-600" />
        </button>
        <ProgressBar progress={goal.progress} target={goal.target} />
      </div>
    </div>
  );
}