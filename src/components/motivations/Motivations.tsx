import React from 'react';
import { Quote, Plus } from 'lucide-react';

export function Motivations() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daily Motivations</h1>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Quote</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Sample motivation cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 space-y-4">
            <Quote className="w-8 h-8 text-pink-500" />
            <blockquote className="text-lg font-medium text-gray-900">
              "The only way to do great work is to love what you do."
            </blockquote>
            <footer className="text-sm text-gray-600">
              - Steve Jobs
            </footer>
          </div>
        ))}
      </div>
    </div>
  );
}