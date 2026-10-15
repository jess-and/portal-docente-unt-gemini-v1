import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    type = 'button',
    onClick,
    className = '',
    disabled = false,
    size = 'md'
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base'
    };

    const variants = {
        primary: 'bg-unt-blue hover:bg-unt-blue-dark text-white focus:ring-unt-blue',
        gold: 'bg-unt-gold hover:bg-unt-gold-dark text-unt-blue font-bold focus:ring-unt-gold',
        secondary: 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-slate-100 focus:ring-slate-400',
        outline: 'border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 focus:ring-unt-blue',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
    };

    return (
        <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
        >
        {children}
        </button>
    );
};

export default Button;
