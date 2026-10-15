import React from 'react';
import { useForm } from 'react-hook-form';
import { validateJustification } from '../../utils/validators';
import { Send, Upload, AlertCircle } from 'lucide-react';

const TrainingRequestForm = ({ onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      trainingType: 'Curso de Especialización',
      modality: 'Presencial',
      financialSupport: ['Parcial'],
      destinationDepartment: 'Escuela de Ciencia Política'
    }
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        id: `REQ-${Date.now()}`,
        status: 'Pendiente',
        submittedAt: new Date().toISOString().split('T')[0]
      };
      
      await fetch('http://localhost:3001/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => console.log('Simulando guardado local de solicitud'));

      alert('¡Solicitud de capacitación enviada con éxito!');
      reset();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (e) {
      alert('Error al enviar la solicitud.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="border-b border-gray-100 dark:border-slate-700 pb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Formulario de Solicitud de Capacitación / Beca</h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Complete los datos requeridos para presentar su expediente a la entidad pertinente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Tipo de Capacitación *</label>
          <select
            {...register('trainingType', { required: 'Seleccione un tipo' })}
            className="w-full rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm p-2.5 border focus:ring-2 focus:ring-unt-blue"
          >
            <option value="Curso de Especialización">Curso de Especialización</option>
            <option value="Maestría">Maestría</option>
            <option value="Doctorado">Doctorado</option>
            <option value="Diplomado">Diplomado</option>
            <option value="Congreso/Seminario">Congreso / Seminario</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Nombre del Evento / Programa *</label>
          <input
            type="text"
            placeholder="Ej: Doctorado en Políticas Públicas"
            {...register('trainingName', { required: 'El nombre es obligatorio' })}
            className="w-full rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm p-2.5 border focus:ring-2 focus:ring-unt-blue"
          />
          {errors.trainingName && <p className="text-xs text-red-500 mt-1">{errors.trainingName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Institución Oferente *</label>
          <input
            type="text"
            placeholder="Ej: Universidad Nacional Mayor de San Marcos"
            {...register('institution', { required: 'La institución es obligatoria' })}
            className="w-full rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm p-2.5 border focus:ring-2 focus:ring-unt-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Modalidad *</label>
          <select
            {...register('modality')}
            className="w-full rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm p-2.5 border focus:ring-2 focus:ring-unt-blue"
          >
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Fecha de Inicio *</label>
          <input type="date" {...register('startDate', { required: true })} className="w-full rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm p-2.5 border" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Fecha de Término *</label>
          <input type="date" {...register('endDate', { required: true })} className="w-full rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm p-2.5 border" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Costo Estimado (S/.) *</label>
          <input
            type="number"
            placeholder="0.00"
            {...register('estimatedCost', { required: true, min: 0 })}
            className="w-full rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm p-2.5 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Apoyo Financiero Solicitado</label>
          <div className="space-y-2 mt-2">
            {['Total', 'Parcial', 'Solo permiso sin apoyo económico'].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                <input type="checkbox" value={item} {...register('financialSupport')} className="rounded text-unt-blue focus:ring-unt-blue" />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">
          Justificación Académica / Institucional (Mínimo 100 caracteres) *
        </label>
        <textarea
          rows={4}
          placeholder="Explique detalladamente de qué manera esta capacitación impactará en sus labores de docencia, investigación y en el desarrollo institucional de la UNT..."
          {...register('justification', { validate: validateJustification })}
          className="w-full rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm p-2.5 border focus:ring-2 focus:ring-unt-blue"
        ></textarea>
        {errors.justification && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.justification.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Entidad de Destino *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {[
            'Escuela de Ciencia Política',
            'Facultad de Derecho y Ciencias Políticas',
            'Rectorado',
            'Vicerrectorado Académico',
            'Otra entidad pertinente'
          ].map((dept) => (
            <label key={dept} className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300 p-2 rounded border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer">
              <input type="radio" value={dept} {...register('destinationDepartment')} className="text-unt-blue focus:ring-unt-blue" />
              {dept}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Documento Sustentatorio (PDF, Máx 5MB)</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div className="flex text-sm text-gray-600 dark:text-slate-400">
              <label className="relative cursor-pointer rounded-md font-medium text-unt-blue dark:text-unt-gold hover:underline">
                <span>Subir un archivo</span>
                <input type="file" accept=".pdf" className="sr-only" {...register('document')} />
              </label>
              <p className="pl-1">o arrastrar y soltar</p>
            </div>
            <p className="text-xs text-gray-500">PDF hasta 5MB (Brochure, Carta de Aceptación, etc.)</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-unt-blue hover:bg-unt-blue-dark text-white rounded-lg font-medium text-sm shadow flex items-center gap-2 transition disabled:opacity-50"
        >
          <Send className="w-4 h-4" /> Enviar Solicitud
        </button>
      </div>
    </form>
  );
};

export default TrainingRequestForm;