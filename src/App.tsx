import React from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Calendar } from './components/calendar/Calendar';
import { Motivations } from './components/motivations/Motivations';
import { Plans } from './components/plans/Plans';
import { SideNav } from './components/navigation/SideNav';
import { CalendarIcon } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { useAuth } from './contexts/AuthContext';

type Page = 'goals' | 'calendar' | 'motivations' | 'plans';

function AppContent() {
  const [page, setPage] = React.useState<Page>('goals');
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);
  const { user, loading } = useAuth();

  const getPageContent = () => {
    switch (page) {
      case 'goals':
        return <Dashboard />;
      case 'calendar':
        return <Calendar />;
      case 'motivations':
        return <Motivations />;
      case 'plans':
        return <Plans />;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <AuthModal />;
  }

  return (
    <div className="min-h-screen bg-gray-100 lg:flex">
      <SideNav 
        isOpen={isSideNavOpen} 
        onClose={() => setIsSideNavOpen(false)}
        onNavigate={setPage}
        currentPage={page}
      />
      <div className="flex-1">
        <Header 
          onMenuClick={() => setIsSideNavOpen(true)}
          onCalendarClick={() => setPage('calendar')}
          rightIcon={<CalendarIcon className="w-5 h-5" />}
        />
        <main className="pt-4">
          {getPageContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;