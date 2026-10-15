import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 w-full ${maxWidth} overflow-hidden transform transition-all`}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        <button
        onClick={onClose}
        aria-label="Cerrar modal"
        className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
        >
        <X className="w-5 h-5" />
        </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
        {children}
        </div>
        </div>
        </div>
    );
};

export default Modal;
