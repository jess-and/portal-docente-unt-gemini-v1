import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validateInstitutionalEmail, validatePassword } from '../../utils/validators';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const LoginForm = ({ onSubmit, onForgotPassword }) => {
    const [errorMsg, setErrorMsg] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const handleFormSubmit = async (data) => {
        setErrorMsg('');
        const res = await onSubmit(data.email, data.password);
        if (!res.success) {
            setErrorMsg(res.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
            </div>
        )}

        <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">
        Correo Institucional (@unitru.edu.pe) *
        </label>
        <div className="relative">
        <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        <input
        type="email"
        placeholder="usuario@unitru.edu.pe"
        {...register('email', { validate: validateInstitutionalEmail })}
        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-unt-blue focus:outline-none"
        />
        </div>
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
        <div className="flex justify-between items-center mb-1">
        <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">
        Contraseña *
        </label>
        <button
        type="button"
        onClick={onForgotPassword}
        className="text-xs text-unt-blue dark:text-unt-gold hover:underline font-medium"
        >
        ¿Olvidó su contraseña?
        </button>
        </div>
        <div className="relative">
        <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        <input
        type="password"
        placeholder="••••••••"
        {...register('password', { validate: validatePassword })}
        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-unt-blue focus:outline-none"
        />
        </div>
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 px-4 bg-unt-blue hover:bg-unt-blue-dark text-white rounded-lg text-sm font-semibold shadow transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
        <LogIn className="w-4 h-4" />
        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>

        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] text-gray-600 dark:text-slate-400">
        <p className="font-semibold text-gray-800 dark:text-slate-200 mb-0.5">Credenciales Demo Rápidas:</p>
        <p>Docente: <code className="text-unt-blue dark:text-unt-gold">cmendoza@unitru.edu.pe</code> / <code className="text-unt-blue dark:text-unt-gold">Password123!</code></p>
        </div>
        </form>
    );
};

export default LoginForm;
