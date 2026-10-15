import React from 'react';
import { useNavigate } from 'react-router-dom';
import TrainingRequestForm from '../components/training/TrainingRequestForm';

const TrainingRequestPage = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
        <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nueva Solicitud de Capacitación / Beca</h1>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
        Complete la información requerida para postular a cursos, diplomados, pasantías o grados académicos ante la universidad.
        </p>
        </div>

        <TrainingRequestForm onSubmitSuccess={() => navigate('/mis-solicitudes')} />
        </div>
    );
};

export default TrainingRequestPage;
