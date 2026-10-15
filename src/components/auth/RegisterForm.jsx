import React from 'react';
import { useForm } from 'react-hook-form';
import { validateInstitutionalEmail, validateDni, validatePassword } from '../../utils/validators';
import { UserPlus, Mail, Lock, User, IdCard } from 'lucide-react';

const RegisterForm = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            faculty: 'Facultad de Derecho y Ciencias Políticas',
            category: 'Principal'
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Nombre Completo *</label>
        <div className="relative">
        <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        <input
        type="text"
        placeholder="Dr. / Dra. Nombres y Apellidos"
        {...register('fullName', { required: 'El nombre es obligatorio' })}
        className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-gray-900 dark:text-white"
        />
        </div>
        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Correo Institucional *</label>
        <div className="relative">
        <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        <input
        type="email"
        placeholder="docente@unitru.edu.pe"
        {...register('email', { validate: validateInstitutionalEmail })}
        className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-gray-900 dark:text-white"
        />
        </div>
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">DNI *</label>
        <div className="relative">
        <IdCard className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        <input
        type="text"
        placeholder="18293847"
        {...register('dni', { validate: validateDni })}
        className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-gray-900 dark:text-white"
        />
        </div>
        {errors.dni && <p className="text-xs text-red-500 mt-1">{errors.dni.message}</p>}
        </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Facultad *</label>
        <select
        {...register('faculty')}
        className="w-full py-2 px-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-gray-900 dark:text-white"
        >
        <option value="Facultad de Derecho y Ciencias Políticas">Facultad de Derecho y Ciencias Políticas</option>
        <option value="Facultad de Ciencias Económicas">Facultad de Ciencias Económicas</option>
        <option value="Facultad de Ciencias Biológicas">Facultad de Ciencias Biológicas</option>
        <option value="Facultad de Ciencias Físicas y Matemáticas">Facultad de Ciencias Físicas y Matemáticas</option>
        <option value="Facultad de Educación y Ciencias de la Comunicación">Facultad de Educación y CC.CC.</option>
        <option value="Facultad de Ingeniería">Facultad de Ingeniería</option>
        <option value="Facultad de Medicina">Facultad de Medicina</option>
        </select>
        </div>

        <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Categoría Docente *</label>
        <select
        {...register('category')}
        className="w-full py-2 px-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-gray-900 dark:text-white"
        >
        <option value="Principal">Principal</option>
        <option value="Asociado">Asociado</option>
        <option value="Auxiliar">Auxiliar</option>
        </select>
        </div>
        </div>

        <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Contraseña *</label>
        <div className="relative">
        <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        <input
        type="password"
        placeholder="Mínimo 6 caracteres"
        {...register('password', { validate: validatePassword })}
        className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-gray-900 dark:text-white"
        />
        </div>
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 px-4 bg-unt-blue hover:bg-unt-blue-dark text-white rounded-lg text-sm font-semibold shadow transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
        >
        <UserPlus className="w-4 h-4" /> Registrar Docente
        </button>
        </form>
    );
};

export default RegisterForm;
