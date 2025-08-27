import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Star, 
  FileText, 
  Bot,
  Menu,
  X,
  Home,
  UserPlus,

} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  onReferralClick: () => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isSidebarOpen, 
  setIsSidebarOpen,
  onReferralClick 
}: SidebarProps) {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, isLink: true, path: '/' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'social', label: 'Social Tasks', icon: Users },
    { id: 'daily-spin', label: 'Daily Spin', icon: Star },
    { id: 'whitepaper', label: 'Whitepaper', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden p-2 rounded-lg bg-astro-primary/20 text-astro-primary hover:bg-astro-primary/30 transition-all"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        className={`fixed lg:relative z-40 w-64 bg-astro-panel/95 backdrop-blur-md border-r border-astro-primary/20 h-screen lg:h-auto lg:min-h-screen flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-astro-primary/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="SpinLoot" className="w-8 h-8 rounded-full" />
            <span className="text-astro-primary font-bold text-xl astro-text">SpinLoot</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 pt-8 lg:pt-4 flex-1">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              
              if (item.isLink) {
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path || '/'}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{item.label}</span>
                    </Link>
                  </li>
                );
              }
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-astro-primary/20 text-astro-primary border border-astro-primary/30'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 space-y-4 flex-shrink-0">
          {/* Referral Section */}
          <motion.button
            onClick={onReferralClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-astro-accent to-astro-secondary text-white border border-astro-accent/30 hover:bg-astro-accent/20 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus className="w-5 h-5" />
            <span className="font-semibold">Refer & Earn</span>
          </motion.button>

          {/* Account Section */}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-astro-accent/20 text-astro-accent border border-astro-accent/30 hover:bg-astro-accent/30 transition-all">
            <Bot className="w-5 h-5" />
            <span className="font-semibold">Account</span>
          </button>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
