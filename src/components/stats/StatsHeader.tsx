import React from 'react';
import { Trophy } from 'lucide-react';

export function StatsHeader() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-3">
        <Trophy className="w-8 h-8 text-pink-600" />
        <h1 className="text-2xl font-bold">Your Progress Stats</h1>
      </div>
    </div>
  );
}