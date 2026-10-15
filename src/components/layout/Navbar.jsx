import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import NotificationBell from '../shared/NotificationBell';
import ThemeToggle from '../shared/ThemeToggle';
import UntLogo from '../shared/UntLogo';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-unt-blue dark:bg-slate-900 border-b border-unt-blue-dark dark:border-slate-800 text-white shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              aria-label="Abrir menú de navegación"
              className="lg:hidden p-2 rounded-md text-white hover:bg-unt-blue-light dark:hover:bg-slate-800 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <UntLogo className="w-9 h-9" />
              <div>
                <span className="font-bold text-lg tracking-wide text-white block leading-none">UNT</span>
                <span className="text-xs text-unt-gold font-medium tracking-wider uppercase">Portal Docentes</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <NotificationBell />

            {/* Menú Usuario */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-unt-blue-light dark:hover:bg-slate-800 transition focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-unt-gold text-unt-blue font-bold flex items-center justify-center text-sm shadow">
                  {user?.fullName?.charAt(0) || 'D'}
                </div>
                <span className="hidden md:block text-sm font-medium text-white max-w-[140px] truncate">
                  {user?.fullName || 'Docente UNT'}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl py-2 border border-gray-100 dark:border-slate-700 text-gray-800 dark:text-gray-200 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
                    <p className="text-sm font-semibold truncate">{user?.fullName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                      <ShieldCheck className="w-3 h-3" /> {user?.category || 'Docente'} ({user?.role})
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-left transition"
                  >
                    <LogOut className="w-4 h-4" /> Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;