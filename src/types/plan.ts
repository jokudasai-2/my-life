export type PlanStatus = 'not-started' | 'in-progress' | 'completed';
export type PlanPriority = 'low' | 'medium' | 'high';

export interface Plan {
  id: string;
  title: string;
  description: string;
  timeline: {
    startDate: string;
    endDate: string;
  };
  target: string;
  priority: PlanPriority;
  status: PlanStatus;
  milestones: Milestone[];
  notes?: string;
}

export interface Milestone {
  id: string;
  title: string;
  targetDate: string;
  completed: boolean;
}