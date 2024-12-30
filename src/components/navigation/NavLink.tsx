import React, { ReactNode } from 'react';

interface NavLinkProps {
  icon: ReactNode;
  label: string;
  path: string;
  onClick: () => void;
  onNavigate: (path: string) => void;
}

export function NavLink({ icon, label, path, onClick, onNavigate }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
    onNavigate(path);
  };
  
  return (
    <button
      onClick={handleClick}
      className={`
        w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
        text-left
        ${path === window.location.pathname.slice(1)
          ? 'bg-pink-50 text-pink-600' 
          : 'text-gray-700 hover:bg-gray-50'
        }
      `}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}