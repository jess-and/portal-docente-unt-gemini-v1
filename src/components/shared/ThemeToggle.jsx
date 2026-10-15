import React, { useState } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);

    const options = [
        { id: 'light', label: 'Modo Claro', icon: Sun },
        { id: 'dark', label: 'Modo Oscuro', icon: Moon },
        { id: 'system', label: 'Sistema', icon: Laptop },
    ];

    return (
        <div className="relative">
        <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-white hover:bg-unt-blue-light dark:hover:bg-slate-800 transition focus:outline-none"
        title="Cambiar tema de la aplicación"
        >
        {theme === 'light' && <Sun className="w-5 h-5 text-unt-gold" />}
        {theme === 'dark' && <Moon className="w-5 h-5 text-unt-gold" />}
        {theme === 'system' && <Laptop className="w-5 h-5 text-unt-gold" />}
        </button>

        {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-xl py-1 border border-gray-100 dark:border-slate-700 z-50">
            {options.map((opt) => {
                const Icon = opt.icon;
                return (
                    <button
                    key={opt.id}
                    onClick={() => {
                        setTheme(opt.id);
                        setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition ${
                        theme === opt.id
                        ? 'text-unt-blue dark:text-unt-gold bg-blue-50 dark:bg-slate-700/60 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700/40'
                    }`}
                    >
                    <Icon className="w-4 h-4" />
                    {opt.label}
                    </button>
                );
            })}
            </div>
        )}
        </div>
    );
};

export default ThemeToggle;
