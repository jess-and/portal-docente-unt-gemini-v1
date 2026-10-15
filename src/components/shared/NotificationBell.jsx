import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';

const NotificationBell = () => {
    const { unreadCount } = useNotifications();

    return (
        <Link
        to="/notificaciones"
        className="relative p-2 rounded-lg text-white hover:bg-unt-blue-light dark:hover:bg-slate-800 transition focus:outline-none"
        title="Notificaciones"
        >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-unt-blue dark:ring-slate-900 animate-pulse">
            {unreadCount}
            </span>
        )}
        </Link>
    );
};

export default NotificationBell;
