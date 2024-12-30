import React from 'react';

interface ProgressBarProps {
  progress: number;
  target: number;
}

export function ProgressBar({ progress, target }: ProgressBarProps) {
  const percentage = Math.min((progress / target) * 100, 100);
  
  return (
    <div className="w-24 bg-gray-200 rounded-full h-2">
      <div
        className="bg-pink-600 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}