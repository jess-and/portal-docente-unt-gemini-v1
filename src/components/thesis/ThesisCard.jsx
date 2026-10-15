import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, AlertTriangle, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { getDaysRemaining, getTrafficLightDetails, formatDateSpanish } from '../../utils/dateUtils';
import ProgressBar from './ProgressBar';

const ThesisCard = ({ thesis }) => {
  const daysLeft = getDaysRemaining(thesis.defenseDate);
  const light = getTrafficLightDetails(daysLeft);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col justify-between">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${light.bgClass}`}>
            <span className={`w-2 h-2 rounded-full ${light.badgeDot}`}></span>
            {light.label}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            {thesis.professorRole}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-base line-clamp-2 mb-2 group-hover:text-unt-blue">
          {thesis.title}
        </h3>

        <div className="space-y-1.5 text-xs text-gray-600 dark:text-slate-400 mb-4">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium text-gray-800 dark:text-slate-300">{thesis.studentName}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span>{thesis.faculty}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>Defensa: {formatDateSpanish(thesis.defenseDate)} - {thesis.defenseTime}</span>
          </div>
        </div>

        {/* Indicador de Progreso Visual y Semáforo */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700/60">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-gray-500 dark:text-slate-400">Etapa: <strong className="text-gray-700 dark:text-slate-200">{thesis.stage}</strong></span>
            <span className={`font-semibold ${light.textClass}`}>{light.status}</span>
          </div>
          <ProgressBar daysLeft={daysLeft} colorClass={light.barClass} />
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50 dark:bg-slate-800/80 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-slate-400 truncate max-w-[180px]">
          {thesis.researchArea}
        </span>
        <Link
          to={`/tesis/${thesis.id}`}
          className="inline-flex items-center text-xs font-semibold text-unt-blue dark:text-unt-gold hover:underline gap-1"
        >
          Ver Detalle <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default ThesisCard;