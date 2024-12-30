import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Milestone } from '../../types/plan';

interface MilestoneListProps {
  milestones: Milestone[];
  onChange: (milestones: Milestone[]) => void;
}

export function MilestoneList({ milestones, onChange }: MilestoneListProps) {
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    targetDate: '',
  });

  const addMilestone = () => {
    if (newMilestone.title && newMilestone.targetDate) {
      onChange([
        ...milestones,
        {
          id: crypto.randomUUID(),
          title: newMilestone.title,
          targetDate: newMilestone.targetDate,
          completed: false,
        },
      ]);
      setNewMilestone({ title: '', targetDate: '' });
    }
  };

  const removeMilestone = (id: string) => {
    onChange(milestones.filter((m) => m.id !== id));
  };

  const toggleMilestone = (id: string) => {
    onChange(
      milestones.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Milestones
        </label>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMilestone.title}
          onChange={(e) =>
            setNewMilestone({ ...newMilestone, title: e.target.value })
          }
          placeholder="Milestone title"
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="date"
          value={newMilestone.targetDate}
          onChange={(e) =>
            setNewMilestone({ ...newMilestone, targetDate: e.target.value })
          }
          className="w-40 p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="button"
          onClick={addMilestone}
          className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={milestone.completed}
                onChange={() => toggleMilestone(milestone.id)}
                className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
              />
              <div>
                <p className="font-medium">{milestone.title}</p>
                <p className="text-sm text-gray-600">
                  Due: {new Date(milestone.targetDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeMilestone(milestone.id)}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}