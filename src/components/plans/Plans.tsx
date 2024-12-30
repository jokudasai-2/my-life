import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PlanModal } from './PlanModal';
import { PlanCard } from './PlanCard';
import { Plan } from '../../types/plan';
import { usePlans } from '../../hooks/usePlans';

export function Plans() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | undefined>();
  const { plans, loading, error, addPlan, updatePlan, deletePlan } = usePlans();

  const handleSave = async (plan: Plan) => {
    try {
      if (editingPlan) {
        await updatePlan(plan);
      } else {
        await addPlan(plan);
      }
      setIsModalOpen(false);
      setEditingPlan(undefined);
    } catch (err) {
      console.error('Error saving plan:', err);
    }
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePlan(id);
    } catch (err) {
      console.error('Error deleting plan:', err);
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Error loading plans: {error}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Future Plans</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Plan</span>
        </button>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <PlanModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPlan(undefined);
        }}
        onSave={handleSave}
        plan={editingPlan}
      />
    </div>
  );
}