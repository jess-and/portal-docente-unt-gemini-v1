import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-6 mt-auto text-xs text-gray-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
        <div>
        <p className="font-semibold text-gray-800 dark:text-slate-300">Universidad Nacional de Trujillo — UNT</p>
        <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5">Fundada en 1824 | Vicerrectorado Académico y de Investigación</p>
        </div>
        <div>
        <p>© {new Date().getFullYear()} Portal Docentes. Todos los derechos reservados.</p>
        </div>
        </div>
        </footer>
    );
};

export default Footer;
