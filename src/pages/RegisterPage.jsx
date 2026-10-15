import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';
import UntLogo from '../components/shared/UntLogo';
import ThemeToggle from '../components/shared/ThemeToggle';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegisterSubmit = async (data) => {
        const res = await register(data);
        if (res.success) {
            alert('¡Cuenta creada con éxito! Bienvenido al portal.');
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-900 p-4 my-8 transition-colors">
        <div className="absolute top-4 right-4">
        <ThemeToggle />
        </div>

        <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-2">
        <UntLogo className="w-14 h-14 mx-auto mb-1" />
        <h1 className="text-2xl font-extrabold text-unt-blue dark:text-unt-gold tracking-tight">
        Registro de Docente UNT
        </h1>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl">
        <RegisterForm onSubmit={handleRegisterSubmit} />

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700 text-center">
        <p className="text-xs text-gray-600 dark:text-slate-400">
        ¿Ya tiene una cuenta activa?{' '}
        <Link to="/login" className="font-bold text-unt-blue dark:text-unt-gold hover:underline">
        Inicie sesión aquí
        </Link>
        </p>
        </div>
        </div>
        </div>
        </div>
    );
};

export default RegisterPage;
