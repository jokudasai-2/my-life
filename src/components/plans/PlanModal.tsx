import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Plan, PlanPriority, PlanStatus } from '../../types/plan';
import { MilestoneList } from './MilestoneList';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: Plan) => void;
  plan?: Plan;
}

export function PlanModal({ isOpen, onClose, onSave, plan }: PlanModalProps) {
  const [formData, setFormData] = useState<Partial<Plan>>(plan || {
    title: '',
    description: '',
    timeline: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
    },
    target: '',
    priority: 'medium',
    status: 'not-started',
    milestones: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: plan?.id || crypto.randomUUID(),
      ...formData as Plan
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {plan ? 'Edit Plan' : 'Create New Plan'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-4">
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
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 h-24"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.timeline?.startDate}
                  onChange={(e) => setFormData({
                    ...formData,
                    timeline: { ...formData.timeline!, startDate: e.target.value }
                  })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.timeline?.endDate}
                  onChange={(e) => setFormData({
                    ...formData,
                    timeline: { ...formData.timeline!, endDate: e.target.value }
                  })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target
              </label>
              <input
                type="text"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., Run 5km without stopping"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as PlanPriority })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as PlanStatus })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <MilestoneList
              milestones={formData.milestones || []}
              onChange={(milestones) => setFormData({ ...formData, milestones })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 h-24"
                placeholder="Any additional notes or thoughts..."
              />
            </div>
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
              Save Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}