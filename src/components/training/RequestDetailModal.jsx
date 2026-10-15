import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Badge from '../shared/Badge';
import { formatDateSpanish } from '../../utils/dateUtils';

const RequestDetailModal = ({ request, isOpen, onClose, onUpdateStatus, isAdmin = false }) => {
    const [status, setStatus] = useState(request?.status || 'Pendiente');
    const [comment, setComment] = useState(request?.adminComment || '');

    if (!request) return null;

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        if (onUpdateStatus) {
            onUpdateStatus(request.id, status, comment);
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Detalle de Solicitud #${request.id}`} maxWidth="max-w-2xl">
        <div className="space-y-5">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-700">
        <div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{request.trainingName}</h3>
        <p className="text-xs text-gray-500 dark:text-slate-400">{request.trainingType} • {request.modality}</p>
        </div>
        <Badge variant={request.status}>{request.status}</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg space-y-1">
        <p className="text-gray-400 font-medium">Solicitante</p>
        <p className="font-bold text-gray-800 dark:text-slate-200">{request.userName || request.userEmail}</p>
        <p className="text-gray-500">{request.userEmail}</p>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg space-y-1">
        <p className="text-gray-400 font-medium">Institución Oferente</p>
        <p className="font-bold text-gray-800 dark:text-slate-200">{request.institution}</p>
        <p className="text-gray-500">Destino: {request.destinationDepartment}</p>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg space-y-1">
        <p className="text-gray-400 font-medium">Periodo del Programa</p>
        <p className="font-bold text-gray-800 dark:text-slate-200">
        {formatDateSpanish(request.startDate)} — {formatDateSpanish(request.endDate)}
        </p>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg space-y-1">
        <p className="text-gray-400 font-medium">Costo y Apoyo Solicitado</p>
        <p className="font-bold text-gray-800 dark:text-slate-200">S/. {Number(request.estimatedCost).toLocaleString()}</p>
        <p className="text-gray-500">Tipo: {Array.isArray(request.financialSupport) ? request.financialSupport.join(', ') : request.financialSupport}</p>
        </div>
        </div>

        <div>
        <h4 className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-1">Justificación Académica</h4>
        <p className="text-xs text-gray-600 dark:text-slate-300 bg-gray-50 dark:bg-slate-900/40 p-3 rounded-lg border border-gray-200 dark:border-slate-700 leading-relaxed">
        {request.justification}
        </p>
        </div>

        {request.adminComment && (
            <div className="p-3 bg-blue-50 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-700 rounded-lg text-xs">
            <p className="font-bold text-unt-blue dark:text-unt-gold mb-0.5">Observación / Dictamen Institucional:</p>
            <p className="text-gray-700 dark:text-slate-300">{request.adminComment}</p>
            </div>
        )}

        {isAdmin && (
            <form onSubmit={handleAdminSubmit} className="pt-4 border-t border-gray-100 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">Actualizar Estado (Gestión Admin)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">Nuevo Estado</label>
            <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full py-2 px-3 text-xs rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
            >
            <option value="Pendiente">Pendiente</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Rechazado">Rechazado</option>
            </select>
            </div>

            <div>
            <label className="block text-xs text-gray-600 dark:text-slate-400 mb-1">Comentario / Dictamen</label>
            <input
            type="text"
            placeholder="Añada un dictamen o resolución..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full py-2 px-3 text-xs rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
            />
            </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
            <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow"
            >
            Guardar Dictamen
            </button>
            </div>
            </form>
        )}
        </div>
        </Modal>
    );
};

export default RequestDetailModal;
