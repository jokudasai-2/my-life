import React, { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  icon: ReactNode;
  value: string;
  unit: string;
  change: number;
}

export function MetricsCard({ title, icon, value, unit, change }: MetricsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600">{title}</span>
        {icon}
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold">{value}</span>
        <span className="ml-1 text-gray-600">{unit}</span>
      </div>
      <div className="mt-2 flex items-center">
        {change >= 0 ? (
          <TrendingUp className="text-green-500 w-4 h-4" />
        ) : (
          <TrendingDown className="text-red-500 w-4 h-4" />
        )}
        <span className={`ml-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {Math.abs(change)}
          {unit === 'kcal' ? 'kcal' : '%'}
        </span>
      </div>
    </div>
  );
}