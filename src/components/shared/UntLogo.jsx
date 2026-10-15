import React from 'react';

const UntLogo = ({ className = "w-10 h-10" }) => {
    return (
        <div className={`relative flex items-center justify-center rounded-full bg-unt-blue border-2 border-unt-gold p-1 shadow-sm ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="#FFD700" strokeWidth="6" />
        <line x1="20" y1="75" x2="80" y2="75" stroke="#FFD700" strokeWidth="5" />
        <text x="50" y="52" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="26" fill="#FFD700" textAnchor="middle">UNT</text>
        <text x="50" y="68" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="11" fill="#FFFFFF" textAnchor="middle">1824</text>
        </svg>
        </div>
    );
};

export default UntLogo;
