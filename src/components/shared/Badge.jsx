import React from 'react';

const Badge = ({ variant = 'pending', children, className = '' }) => {
    const variants = {
        Pendiente: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800',
        'En Revisión': 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800',
        Aprobado: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800',
        Rechazado: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800'
    };

    const style = variants[variant] || 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-slate-700 dark:text-slate-300';

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style} ${className}`}>
        {children || variant}
        </span>
    );
};

export default Badge;
