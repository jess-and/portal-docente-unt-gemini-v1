import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { validateInstitutionalEmail } from '../../utils/validators';
import { Mail, CheckCircle2 } from 'lucide-react';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const val = validateInstitutionalEmail(email);
        if (val !== true) {
            setError(val);
            return;
        }
        setError('');
        setSent(true);
    };

    const handleResetClose = () => {
        setEmail('');
        setError('');
        setSent(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleResetClose} title="Recuperar Contraseña" maxWidth="max-w-md">
        {sent ? (
            <div className="text-center py-4 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-base text-gray-900 dark:text-white">Instrucciones Enviadas</h4>
            <p className="text-xs text-gray-600 dark:text-slate-300">
            Se ha enviado un enlace de recuperación al correo institucional <strong>{email}</strong>. Por favor revise su bandeja de entrada.
            </p>
            <button
            onClick={handleResetClose}
            className="mt-4 px-4 py-2 bg-unt-blue text-white rounded-lg text-xs font-semibold"
            >
            Entendido
            </button>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-gray-600 dark:text-slate-300">
            Ingrese su correo institucional registrado (`@unitru.edu.pe`) para recibir un enlace de restablecimiento.
            </p>
            <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1">Correo Institucional</label>
            <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
            type="email"
            placeholder="ejemplo@unitru.edu.pe"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-gray-900 dark:text-white"
            />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-2">
            <button
            type="button"
            onClick={handleResetClose}
            className="px-3 py-1.5 text-xs text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
            Cancelar
            </button>
            <button
            type="submit"
            className="px-4 py-1.5 bg-unt-blue hover:bg-unt-blue-dark text-white rounded-lg text-xs font-semibold shadow"
            >
            Enviar Enlace
            </button>
            </div>
            </form>
        )}
        </Modal>
    );
};

export default ForgotPasswordModal;
