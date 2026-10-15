import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, FileText, Bell, AlertTriangle, ArrowRight, PlusCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Banner de Bienvenida */}
      <div className="bg-gradient-to-r from-unt-blue to-unt-blue-dark text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-unt-gold/20 text-unt-gold border border-unt-gold/30 text-xs font-semibold rounded-full mb-3">
            Universidad Nacional de Trujillo
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Bienvenido(a), {user?.fullName || 'Docente UNT'}
          </h1>
          <p className="mt-2 text-blue-100 text-sm max-w-2xl">
            Gestione sus expedientes de solicitud de capacitación docente y realice el seguimiento en tiempo real de sus tesis asignadas.
          </p>
        </div>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Tesis Asignadas</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">8</h3>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-slate-700 text-unt-blue dark:text-unt-gold rounded-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3 font-medium">3 como Asesor, 5 como Jurado</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Defensas Urgentes</p>
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">3</h3>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-red-600 dark:text-red-400 mt-3 font-medium">🟢 Menos de 7 días para sustentación</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Solicitudes de Beca</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">4</h3>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-slate-700 text-amber-600 dark:text-unt-gold rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-3 font-medium">2 Pendientes, 1 Aprobada</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Notificaciones</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">5</h3>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-slate-700 text-purple-600 dark:text-purple-300 rounded-lg">
              <Bell className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-3 font-medium">3 sin leer</p>
        </div>
      </div>

      {/* Accesos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Solicitar Nueva Capacitación / Beca</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
              Presente solicitudes de financiamiento o licencias para maestrías, doctorados, diplomados o eventos académicos.
            </p>
          </div>
          <Link
            to="/solicitar-capacitacion"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-unt-blue hover:bg-unt-blue-dark text-white rounded-lg text-sm font-medium transition"
          >
            <PlusCircle className="w-4 h-4" /> Crear Solicitud
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Supervisión de Tesis</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
              Monitoree las fechas de sustentación, semaforización de plazos y observaciones para sus tesistas asignados.
            </p>
          </div>
          <Link
            to="/tesis"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white rounded-lg text-sm font-medium transition"
          >
            Ver Mis Tesis Asignadas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;