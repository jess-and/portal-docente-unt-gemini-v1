import React from 'react';
import Badge from '../shared/Badge';
import { Calendar, Building, DollarSign, Eye, Edit3 } from 'lucide-react';
import { formatDateSpanish } from '../../utils/dateUtils';

const RequestCard = ({ request, onView, onEdit }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition">
        <div className="flex justify-between items-start gap-2 mb-3">
        <span className="text-xs font-bold text-unt-blue dark:text-unt-gold bg-blue-50 dark:bg-slate-700/60 px-2.5 py-1 rounded">
        {request.id}
        </span>
        <Badge variant={request.status}>{request.status}</Badge>
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 line-clamp-1">
        {request.trainingName}
        </h3>
        <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">{request.trainingType} • {request.modality}</p>

        <div className="space-y-1.5 text-xs text-gray-600 dark:text-slate-300 mb-4">
        <div className="flex items-center gap-2">
        <Building className="w-3.5 h-3.5 text-gray-400" />
        <span className="truncate">{request.institution}</span>
        </div>
        <div className="flex items-center gap-2">
        <Calendar className="w-3.5 h-3.5 text-gray-400" />
        <span>Del {formatDateSpanish(request.startDate)} al {formatDateSpanish(request.endDate)}</span>
        </div>
        <div className="flex items-center gap-2">
        <DollarSign className="w-3.5 h-3.5 text-gray-400" />
        <span>Costo Est.: S/. {Number(request.estimatedCost).toLocaleString()}</span>
        </div>
        </div>

        <div className="pt-3 border-t border-gray-100 dark:border-slate-700/60 flex justify-between items-center">
        <span className="text-[11px] text-gray-400 dark:text-slate-500">Destino: {request.destinationDepartment}</span>
        <div className="flex gap-2">
        {request.status === 'Pendiente' && onEdit && (
            <button
            onClick={() => onEdit(request)}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-xs flex items-center gap-1 font-medium"
            >
            <Edit3 className="w-3.5 h-3.5" /> Editar
            </button>
        )}
        <button
        onClick={() => onView(request)}
        className="px-3 py-1 bg-unt-blue text-white hover:bg-unt-blue-dark rounded-lg text-xs font-medium flex items-center gap-1 shadow-sm"
        >
        <Eye className="w-3.5 h-3.5" /> Ver Detalle
        </button>
        </div>
        </div>
        </div>
    );
};

export default RequestCard;
