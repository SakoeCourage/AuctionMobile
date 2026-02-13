
import React from 'react';
import { Home, Search, PlusCircle, Gavel, User, Bell } from 'lucide-react';

interface LayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
  showTabs?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, onTabChange, children, showTabs = true }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'catalogue', label: 'Browse', icon: Search },
    { id: 'sell', label: 'Sell', icon: PlusCircle },
    { id: 'bids', label: 'Bids', icon: Gavel },
    { id: 'account', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#fcfaf7] relative overflow-hidden shadow-2xl">
      {/* Top Bar - Clean & Modern */}
      <header className="bg-white/80 backdrop-blur-md px-6 h-16 flex items-center justify-between shrink-0 z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 text-white p-1.5 rounded-lg">
            <Gavel size={18} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">ADB<span className="text-orange-500">Auction</span></span>
        </div>
        <button className="p-2.5 bg-slate-50 text-slate-600 hover:text-orange-600 transition-all rounded-xl relative border border-slate-100">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {children}
      </main>

      {/* Bottom Navigation - Rounded Pill style */}
      {showTabs && (
        <div className="absolute bottom-6 left-0 right-0 px-6 z-20">
          <nav className="bg-white/95 backdrop-blur-md border border-slate-100 flex justify-around items-center h-16 shrink-0 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center justify-center w-full transition-all ${
                    isActive ? 'scale-110' : 'opacity-60 grayscale'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-orange-100 text-orange-600' : 'text-slate-400'}`}>
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Layout;
