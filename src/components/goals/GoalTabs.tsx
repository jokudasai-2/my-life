import React, { useState } from 'react';
import { GoalFrequency } from '../../types';
import { GoalsList } from './GoalsList';

export function GoalTabs() {
  const [activeTab, setActiveTab] = useState<GoalFrequency>('daily');

  const tabs: { label: string; value: GoalFrequency }[] = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === value
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
      <GoalsList frequency={activeTab} />
    </div>
  );
}