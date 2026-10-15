import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import UntLogo from '../components/shared/UntLogo';
import ThemeToggle from '../components/shared/ThemeToggle';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [forgotOpen, setForgotOpen] = useState(false);

    const handleLoginSubmit = async (email, password) => {
        const res = await login(email, password);
        if (res.success) {
            navigate('/dashboard');
        }
        return res;
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors">
        <div className="absolute top-4 right-4">
        <ThemeToggle />
        </div>

        <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
        <UntLogo className="w-16 h-16 mx-auto mb-2" />
        <h1 className="text-2xl font-extrabold text-unt-blue dark:text-unt-gold tracking-tight">
        Universidad Nacional de Trujillo
        </h1>
        <p className="text-sm font-semibold text-gray-600 dark:text-slate-300">
        Portal de Gestión Docente
        </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-xl">
        <LoginForm
        onSubmit={handleLoginSubmit}
        onForgotPassword={() => setForgotOpen(true)}
        />

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700 text-center">
        <p className="text-xs text-gray-600 dark:text-slate-400">
        ¿Aún no tiene cuenta registrada?{' '}
        <Link to="/registro" className="font-bold text-unt-blue dark:text-unt-gold hover:underline">
        Regístrese aquí
        </Link>
        </p>
        </div>
        </div>
        </div>

        <ForgotPasswordModal
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
        />
        </div>
    );
};

export default LoginPage;
