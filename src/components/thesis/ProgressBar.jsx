import React from 'react';

const ProgressBar = ({ daysLeft, colorClass }) => {
  // Porcentaje estimado de avance inverso a los días restantes (máximo 60 días de margen)
  const maxDays = 60;
  const clampedDays = Math.max(0, Math.min(daysLeft, maxDays));
  const progressPercent = Math.round(((maxDays - clampedDays) / maxDays) * 100);

  return (
    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
      <div
        className={`h-2.5 rounded-full transition-all duration-500 ${colorClass}`}
        style={{ width: `${Math.max(10, progressPercent)}%` }}
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export default ProgressBar;