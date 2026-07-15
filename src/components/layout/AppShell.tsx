import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/button';
import Sparks from '../ui/Sparks';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function AppShell() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-black text-foreground">
      <Sparks />
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-white/10 bg-black/30 backdrop-blur-md transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link to="/dashboard" className="flex items-center space-x-2 font-bold tracking-tight text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <LayoutDashboard className="h-5 w-5 text-[#FFD700]" />
            </div>
            <span className="text-[#FFD700] text-lg whitespace-nowrap" style={{ fontFamily: "'Cinzel', serif", letterSpacing: "1px" }}>CRM DASHBOARD</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/30 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-[#FFD700]' : 'text-white/70 group-hover:text-white'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <div className="h-9 w-9 rounded-full bg-primary/40 flex items-center justify-center text-primary font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{user?.name}</span>
              <span className="text-xs text-white/70">{user?.email}</span>
            </div>
          </div>
          <Button variant="ghost" className="mt-2 w-full justify-start text-white/70 hover:text-white hover:bg-white/10" onClick={logout}>
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </Button>
        </div>
      </aside>

      <main className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-md px-4 sm:px-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-extrabold">
              {navigation.find(item => location.pathname.startsWith(item.href))?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Header controls removed */}
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 no-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
