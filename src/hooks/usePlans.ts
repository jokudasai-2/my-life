import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plan } from '../types/plan';
import { useAuth } from '../contexts/AuthContext';

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPlans();
    }
  }, [user]);

  async function fetchPlans() {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select(`
          *,
          milestones (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPlans(data.map(plan => ({
        id: plan.id,
        title: plan.title,
        description: plan.description || '',
        timeline: {
          startDate: plan.start_date,
          endDate: plan.end_date
        },
        target: plan.target,
        priority: plan.priority,
        status: plan.status,
        notes: plan.notes || '',
        milestones: (plan.milestones || []).map((m: any) => ({
          id: m.id,
          title: m.title,
          targetDate: m.target_date,
          completed: m.completed
        })).sort((a: any, b: any) => 
          new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
        )
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function addPlan(plan: Omit<Plan, 'id'>) {
    if (!user) {
      setError('User must be authenticated to add plans');
      return;
    }

    try {
      // First, insert the plan
      const { data: planData, error: planError } = await supabase
        .from('plans')
        .insert({
          user_id: user.id,
          title: plan.title,
          description: plan.description,
          start_date: plan.timeline.startDate,
          end_date: plan.timeline.endDate,
          target: plan.target,
          priority: plan.priority,
          status: plan.status,
          notes: plan.notes
        })
        .select()
        .single();

      if (planError) throw planError;

      // Then, insert milestones if any
      if (plan.milestones && plan.milestones.length > 0) {
        const { error: milestonesError } = await supabase
          .from('milestones')
          .insert(
            plan.milestones.map(m => ({
              plan_id: planData.id,
              title: m.title,
              target_date: m.targetDate,
              completed: m.completed
            }))
          );

        if (milestonesError) throw milestonesError;
      }

      await fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function updatePlan(plan: Plan) {
    if (!user) {
      setError('User must be authenticated to update plans');
      return;
    }

    try {
      // Update plan
      const { error: planError } = await supabase
        .from('plans')
        .update({
          title: plan.title,
          description: plan.description,
          start_date: plan.timeline.startDate,
          end_date: plan.timeline.endDate,
          target: plan.target,
          priority: plan.priority,
          status: plan.status,
          notes: plan.notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', plan.id)
        .eq('user_id', user.id);

      if (planError) throw planError;

      // Delete existing milestones
      const { error: deleteError } = await supabase
        .from('milestones')
        .delete()
        .eq('plan_id', plan.id);

      if (deleteError) throw deleteError;

      // Insert new milestones
      if (plan.milestones && plan.milestones.length > 0) {
        const { error: milestonesError } = await supabase
          .from('milestones')
          .insert(
            plan.milestones.map(m => ({
              plan_id: plan.id,
              title: m.title,
              target_date: m.targetDate,
              completed: m.completed
            }))
          );

        if (milestonesError) throw milestonesError;
      }

      await fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function deletePlan(id: string) {
    if (!user) {
      setError('User must be authenticated to delete plans');
      return;
    }

    try {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  return {
    plans,
    loading,
    error,
    addPlan,
    updatePlan,
    deletePlan
  };
}