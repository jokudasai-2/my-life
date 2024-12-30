import React from 'react';
import { Target, Calendar, Lightbulb, ListTodo, X } from 'lucide-react';
import { NavLink } from './NavLink';

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function SideNav({ isOpen, onClose, onNavigate, currentPage }: SideNavProps) {
  const links = [
    { icon: <Target className="w-5 h-5" />, label: 'Goals', path: 'goals' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Calendar', path: 'calendar' },
    { icon: <Lightbulb className="w-5 h-5" />, label: 'Motivations', path: 'motivations' },
    { icon: <ListTodo className="w-5 h-5" />, label: 'Plans', path: 'plans' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-0
      `}>
        <div className="p-4 border-b flex justify-between items-center lg:hidden">
          <h2 className="font-semibold text-lg">Menu</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              {...link}
              onClick={onClose}
              onNavigate={onNavigate}
            />
          ))}
        </nav>
      </div>
    </>
  );
}