import React from 'react';
import { CheckCircle2, Circle, Plus, Minus, Pencil } from 'lucide-react';
import { Goal } from '../../types';
import { ProgressBar } from '../ProgressBar';

interface GoalItemProps {
  goal: Goal;
  onIncrement: () => void;
  onDecrement: () => void;
  onEdit: () => void;
}

export function GoalItem({ goal, onIncrement, onDecrement, onEdit }: GoalItemProps) {
  const targetValue = parseInt(goal.target);

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
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              Progress: {goal.progress} / {goal.target} {goal.unit}
            </p>
            {goal.motivation && (
              <p className="text-sm text-gray-500 italic">
                "{goal.motivation}"
              </p>
            )}
          </div>
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
        <div className="flex items-center space-x-2">
          <button
            onClick={onDecrement}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Decrement progress"
            disabled={goal.progress <= 0}
          >
            <Minus className={`w-5 h-5 ${goal.progress <= 0 ? 'text-gray-300' : 'text-red-600'}`} />
          </button>
          <button
            onClick={onIncrement}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Increment progress"
          >
            <Plus className="w-5 h-5 text-pink-600" />
          </button>
        </div>
        <ProgressBar progress={Math.min(goal.progress, targetValue)} target={targetValue} />
      </div>
    </div>
  );
}