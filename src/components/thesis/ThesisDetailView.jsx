import React, { useState } from 'react';
import { getDaysRemaining, getTrafficLightDetails, formatDateSpanish } from '../../utils/dateUtils';
import ProgressBar from './ProgressBar';
import { User, Mail, Phone, Calendar, Clock, MapPin, CheckCircle2, Circle, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThesisDetailView = ({ thesis, onSaveNotes }) => {
    const [notes, setNotes] = useState(thesis?.notes || '');
    const [isSaved, setIsSaved] = useState(false);

    if (!thesis) return null;

    const daysLeft = getDaysRemaining(thesis.defenseDate);
    const light = getTrafficLightDetails(daysLeft);

    const handleSave = () => {
        if (onSaveNotes) {
            onSaveNotes(thesis.id, notes);
        }
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-6">
        <div>
        <Link
        to="/tesis"
        className="inline-flex items-center gap-2 text-xs font-semibold text-unt-blue dark:text-unt-gold hover:underline"
        >
        <ArrowLeft className="w-4 h-4" /> Volver al listado de tesis
        </Link>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${light.bgClass}`}>
        <span className={`w-2 h-2 rounded-full ${light.badgeDot}`}></span>
        {light.label} ({light.status})
        </span>
        <span className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
        Rol: {thesis.professorRole}
        </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
        {thesis.title}
        </h1>

        <p className="text-xs text-gray-500 dark:text-slate-400">
        Facultad: <strong>{thesis.faculty}</strong> | Área de Investigación: <strong>{thesis.researchArea}</strong>
        </p>

        <div className="pt-2">
        <div className="flex justify-between text-xs mb-1 font-semibold">
        <span className="text-gray-600 dark:text-slate-300">Etapa Actual: {thesis.stage}</span>
        <span className={light.textClass}>{daysLeft <= 0 ? 'Vencida' : `${daysLeft} días faltantes`}</span>
        </div>
        <ProgressBar daysLeft={daysLeft} colorClass={light.barClass} />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-slate-700 pb-2">
        Información del Tesista
        </h3>
        <div className="space-y-3 text-xs">
        <div className="flex items-center gap-3">
        <User className="w-4 h-4 text-unt-blue dark:text-unt-gold shrink-0" />
        <div>
        <p className="text-gray-400">Nombre del Alumno</p>
        <p className="font-semibold text-gray-800 dark:text-slate-200">{thesis.studentName}</p>
        </div>
        </div>
        <div className="flex items-center gap-3">
        <Mail className="w-4 h-4 text-unt-blue dark:text-unt-gold shrink-0" />
        <div>
        <p className="text-gray-400">Correo Electrónico</p>
        <a href={`mailto:${thesis.studentEmail}`} className="font-semibold text-unt-blue dark:text-unt-gold hover:underline">
        {thesis.studentEmail}
        </a>
        </div>
        </div>
        <div className="flex items-center gap-3">
        <Phone className="w-4 h-4 text-unt-blue dark:text-unt-gold shrink-0" />
        <div>
        <p className="text-gray-400">Teléfono / WhatsApp</p>
        <p className="font-semibold text-gray-800 dark:text-slate-200">{thesis.studentPhone}</p>
        </div>
        </div>
        </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-slate-700 pb-2">
        Programación de Sustentación
        </h3>
        <div className="space-y-3 text-xs">
        <div className="flex items-center gap-3">
        <Calendar className="w-4 h-4 text-unt-blue dark:text-unt-gold shrink-0" />
        <div>
        <p className="text-gray-400">Fecha Estimada</p>
        <p className="font-semibold text-gray-800 dark:text-slate-200">{formatDateSpanish(thesis.defenseDate)}</p>
        </div>
        </div>
        <div className="flex items-center gap-3">
        <Clock className="w-4 h-4 text-unt-blue dark:text-unt-gold shrink-0" />
        <div>
        <p className="text-gray-400">Hora Programada</p>
        <p className="font-semibold text-gray-800 dark:text-slate-200">{thesis.defenseTime}</p>
        </div>
        </div>
        <div className="flex items-center gap-3">
        <MapPin className="w-4 h-4 text-unt-blue dark:text-unt-gold shrink-0" />
        <div>
        <p className="text-gray-400">Ubicación / Sala</p>
        <p className="font-semibold text-gray-800 dark:text-slate-200">{thesis.defenseLocation}</p>
        </div>
        </div>
        </div>
        </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
        Línea de Tiempo y Cumplimiento de Hitos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
        {thesis.milestones?.map((m, idx) => (
            <div
            key={idx}
            className={`p-3 rounded-xl border text-xs flex flex-col justify-between space-y-2 ${
                m.completed
                ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                : 'bg-gray-50 dark:bg-slate-900/40 border-gray-200 dark:border-slate-700'
            }`}
            >
            <div className="flex items-center gap-1.5">
            {m.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
                <Circle className="w-4 h-4 text-gray-400 shrink-0" />
            )}
            <span className="font-bold text-gray-800 dark:text-slate-200 line-clamp-1">{m.name}</span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-400">{formatDateSpanish(m.date)}</p>
            </div>
        ))}
        </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
        Bitácora / Notas Privadas del Docente
        </h3>
        <p className="text-xs text-gray-500 dark:text-slate-400">
        Utilice este espacio para registrar anotaciones sobre revisiones, reuniones de avance o sugerencias pendientes para el tesista.
        </p>
        <textarea
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Escriba aquí sus observaciones o pendientes de revisión..."
        className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-3 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-unt-blue"
        />
        <div className="flex items-center justify-between pt-1">
        {isSaved ? (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Observaciones guardadas correctamente.
            </span>
        ) : <span />}
        <button
        onClick={handleSave}
        className="px-4 py-2 bg-unt-blue hover:bg-unt-blue-dark text-white rounded-lg text-xs font-semibold shadow flex items-center gap-1.5"
        >
        <Save className="w-3.5 h-3.5" /> Guardar Notas
        </button>
        </div>
        </div>
        </div>
    );
};

export default ThesisDetailView;
