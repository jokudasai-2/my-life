import React from 'react';
import { Clock, Target, Pencil, Trash2 } from 'lucide-react';
import { Plan } from '../../types/plan';

interface PlanCardProps {
  plan: Plan;
  onEdit: (plan: Plan) => void;
  onDelete: (id: string) => void;
}

export function PlanCard({ plan, onEdit, onDelete }: PlanCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{plan.title}</h3>
          <p className="text-gray-600">{plan.description}</p>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>
                {new Date(plan.timeline.startDate).toLocaleDateString()} - {new Date(plan.timeline.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Target: {plan.target}</span>
            </div>
          </div>
          {plan.milestones.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Milestones</h4>
              <div className="space-y-1">
                {plan.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={milestone.completed}
                      readOnly
                      className="w-4 h-4 text-pink-600"
                    />
                    <span className="text-sm">{milestone.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex space-x-2">
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${plan.priority === 'high' ? 'bg-red-100 text-red-800' :
                plan.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'}
            `}>
              {plan.priority.charAt(0).toUpperCase() + plan.priority.slice(1)}
            </span>
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${plan.status === 'completed' ? 'bg-green-100 text-green-800' :
                plan.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'}
            `}>
              {plan.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(plan)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(plan.id)}
              className="text-red-600 hover:text-red-900"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}