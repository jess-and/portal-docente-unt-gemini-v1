import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { Bell, CheckCheck, AlertTriangle, Clock, CheckCircle2, Info } from 'lucide-react';

const NotificationsPage = () => {
    const { notifications, markAsRead, markAllAsRead } = useNotifications();

    const getIcon = (type) => {
        switch (type) {
            case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            case 'reminder': return <Clock className="w-5 h-5 text-amber-500" />;
            case 'info': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-700 pb-4">
        <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <Bell className="w-6 h-6 text-unt-blue dark:text-unt-gold" />
        Centro de Notificaciones
        </h1>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
        Avisos automatizados sobre plazos de sustentación, cambios de estado en becas y comunicados oficiales.
        </p>
        </div>

        <button
        onClick={markAllAsRead}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 text-gray-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition"
        >
        <CheckCheck className="w-4 h-4" /> Marcar todas como leídas
        </button>
        </div>

        <div className="space-y-3">
        {notifications.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 p-8 text-center rounded-xl border border-gray-200 dark:border-slate-700 text-xs text-gray-500">
            No tiene notificaciones registradas.
            </div>
        ) : (
            notifications.map((n) => (
                <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-4 rounded-xl border transition flex items-start gap-4 cursor-pointer ${
                    n.read
                    ? 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 opacity-75'
                    : 'bg-blue-50/50 dark:bg-slate-800/90 border-blue-200 dark:border-slate-600 shadow-sm'
                }`}
                >
                <div className="mt-0.5">{getIcon(n.type)}</div>
                <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">{n.title}</h4>
                <span className="text-[10px] text-gray-400">{n.createdAt}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-slate-300">{n.message}</p>
                </div>
                {!n.read && (
                    <span className="w-2.5 h-2.5 rounded-full bg-unt-blue dark:bg-unt-gold mt-1.5 shrink-0" />
                )}
                </div>
            ))
        )}
        </div>
        </div>
    );
};

export default NotificationsPage;
