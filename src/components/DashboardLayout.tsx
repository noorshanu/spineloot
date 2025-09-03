import React, { useState } from 'react';
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
  Wallet
} from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { WalletConnectButton } from './WalletConnectButton';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, isLink: true, path: '/' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, isLink: true, path: '/dashboard' },
    { id: 'social', label: 'Social Tasks', icon: Users, isLink: true, path: '/social' },
    { id: 'daily-spin', label: 'Daily Spin', icon: Star, isLink: true, path: '/daily-spin' },
    { id: 'whitepaper', label: 'Whitepaper', icon: FileText, isLink: true, path: '/whitepaper' },
    { id: 'referral', label: 'Refer & Earn', icon: UserPlus, isLink: true, path: '/referral' },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-astro-bg via-astro-panel to-astro-dark">
      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 astro-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-radial-primary opacity-20" />
        <div className="absolute top-0 right-0 w-full h-full bg-radial-secondary opacity-15" />
      </div>

      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-astro-panel/80 backdrop-blur-md border-b border-astro-primary/20">
        <div className="flex items-center justify-between p-4">
          {/* Logo and Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-astro-primary/20 text-astro-primary hover:bg-astro-primary/30 transition-all z-50"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="SpinLoot" className="w-8 h-8 rounded-full" />
              <span className="text-astro-primary font-bold text-xl astro-text">SpinLoot</span>
            </div>
          </div>

          {/* Wallet Connection */}
          <WalletConnectButton />
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar - Always visible on lg+ screens */}
        <div className="hidden lg:block w-64 bg-astro-panel/95 backdrop-blur-md border-r border-astro-primary/20 h-screen flex flex-col">
          {/* Navigation */}
          <nav className="p-4 flex-1">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActiveRoute(item.path)
                          ? 'bg-astro-primary/20 text-astro-primary border border-astro-primary/30'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 space-y-4 flex-shrink-0">
            {/* Account Section */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-astro-accent/20 text-astro-accent border border-astro-accent/30 hover:bg-astro-accent/30 transition-all">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Account</span>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar - Slides in/out */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: isSidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`fixed lg:hidden z-50 w-64 bg-astro-panel/95 backdrop-blur-md border-r border-astro-primary/20 h-screen flex flex-col`}
        >
          {/* Logo */}
          <div className="p-6 border-b border-astro-primary/20 flex-shrink-0">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="SpinLoot" className="w-8 h-8 rounded-full" />
              <span className="text-astro-primary font-bold text-xl astro-text">SpinLoot</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActiveRoute(item.path)
                          ? 'bg-astro-primary/20 text-astro-primary border border-astro-primary/30'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 space-y-4 flex-shrink-0">
            {/* Account Section */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-astro-accent/20 text-astro-accent border border-astro-accent/30 hover:bg-astro-accent/30 transition-all">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Account</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 min-h-screen lg:min-h-0">
          <div className="max-w-6xl mx-auto">
            {children || <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
}
