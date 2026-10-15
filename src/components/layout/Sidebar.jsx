import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, FilePlus, FileText, Bell, X, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    const navItems = [
        { to: '/dashboard', label: 'Panel Principal', icon: LayoutDashboard },
        { to: '/solicitar-capacitacion', label: 'Solicitar Capacitación', icon: FilePlus },
        { to: '/mis-solicitudes', label: 'Mis Solicitudes', icon: FileText },
        { to: '/tesis', label: 'Supervisión de Tesis', icon: GraduationCap },
        { to: '/notificaciones', label: 'Notificaciones', icon: Bell },
    ];

    return (
        <>
        {isOpen && (
            <div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
            />
        )}

        <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 transition-transform duration-300 ease-in-out lg:translate-x-0 pt-16 flex flex-col justify-between ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        >
        <div className="p-4 space-y-6 overflow-y-auto">
        <div className="flex justify-between items-center lg:hidden pb-2 border-b border-gray-100 dark:border-slate-700">
        <span className="font-bold text-gray-800 dark:text-white text-sm">Menú de Navegación</span>
        <button onClick={onClose} aria-label="Cerrar navegación" className="p-1 rounded text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700">
        <X className="w-5 h-5" />
        </button>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-unt-blue text-unt-gold font-bold flex items-center justify-center text-sm shadow shrink-0">
        {user?.fullName?.charAt(0) || 'U'}
        </div>
        <div className="overflow-hidden">
        <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{user?.fullName || 'Docente UNT'}</p>
        <p className="text-[11px] text-gray-500 dark:text-slate-400 truncate">{user?.department || 'Facultad'}</p>
        </div>
        </div>

        <nav className="space-y-1">
        <p className="px-3 text-[11px] font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2">
        Módulos Docentes
        </p>
        {navItems.map((item) => {
            const Icon = item.icon;
            return (
                <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                    ? 'bg-unt-blue text-white shadow-sm dark:bg-unt-gold dark:text-slate-900 font-semibold'
                    : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700/50'
                }`
                }
                >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                </NavLink>
            );
        })}
        </nav>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-slate-700/60 bg-gray-50/50 dark:bg-slate-900/30">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
        <Shield className="w-4 h-4 text-unt-blue dark:text-unt-gold shrink-0" />
        <span>Sistema Institucional UNT v1.0.0</span>
        </div>
        </div>
        </aside>
        </>
    );
};

export default Sidebar;
