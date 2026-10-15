import React, { useState, useEffect } from 'react';
import ThesisList from '../components/thesis/ThesisList';
import { GraduationCap } from 'lucide-react';

const ThesisListPage = () => {
    const [theses, setTheses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/theses')
        .then(res => res.json())
        .then(data => {
            setTheses(data);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-6">
        <div className="border-b border-gray-200 dark:border-slate-700 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-unt-blue dark:text-unt-gold" />
        Supervisión y Seguimiento de Tesis
        </h1>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
        Monitoree los plazos de defensa de sus tesistas asignados mediante el sistema de semaforización en tiempo real.
        </p>
        </div>

        {loading ? (
            <div className="p-8 text-center text-xs text-gray-500 animate-pulse">Cargando tesis asignadas...</div>
        ) : (
            <ThesisList theses={theses} />
        )}
        </div>
    );
};

export default ThesisListPage;
