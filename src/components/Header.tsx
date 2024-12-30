import React, { ReactNode } from 'react';
import { Menu, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onCalendarClick: () => void;
  rightIcon: ReactNode;
}

export function Header({ onMenuClick, onCalendarClick, rightIcon }: HeaderProps) {
  return (
    <header className="bg-pink-600 text-white p-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold">My Life</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onCalendarClick}
            className="p-2 hover:bg-pink-700 rounded-full"
            aria-label="Toggle calendar view"
          >
            {rightIcon}
          </button>
          <button className="p-2 hover:bg-pink-700 rounded-full">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}