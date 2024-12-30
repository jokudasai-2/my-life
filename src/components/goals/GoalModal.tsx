import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Goal, GoalFrequency, GoalUnit } from '../../types';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Goal) => void;
  goal?: Goal | null;
  frequency: GoalFrequency;
}

const units: { label: string; value: GoalUnit }[] = [
  { label: 'Count', value: 'count' },
  { label: 'Minutes', value: 'minutes' },
  { label: 'Hours', value: 'hours' },
  { label: 'Kilometers', value: 'kilometers' },
  { label: 'Liters', value: 'liters' },
];

export function GoalModal({ isOpen, onClose, onSave, goal, frequency }: GoalModalProps) {
  const [formData, setFormData] = useState<Partial<Goal>>({
    title: '',
    category: 'health',
    target: '',
    progress: 0,
    frequency,
    unit: 'count',
    motivation: '',
    completed: false,
  });

  useEffect(() => {
    if (goal) {
      setFormData(goal);
    } else {
      setFormData({
        title: '',
        category: 'health',
        target: '',
        progress: 0,
        frequency,
        unit: 'count',
        motivation: '',
        completed: false,
      });
    }
  }, [goal, frequency]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: goal?.id || crypto.randomUUID(),
      ...formData as Goal
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {goal ? 'Edit Goal' : `Add New ${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Goal`}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Goal['category'] })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="health">Health</option>
              <option value="fitness">Fitness</option>
              <option value="nutrition">Nutrition</option>
              <option value="mental">Mental</option>
              <option value="sleep">Sleep</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target
              </label>
              <input
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                min="0"
                step="0.1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value as GoalUnit })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              >
                {units.map(({ label, value }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Progress
            </label>
            <input
              type="number"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              min="0"
              step="0.1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivation (optional)
            </label>
            <textarea
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 h-24 resize-none"
              placeholder="Why is this goal important to you?"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}