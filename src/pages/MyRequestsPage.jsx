import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText } from 'lucide-react';
import RequestList from '../components/training/RequestList';
import { useAuth } from '../hooks/useAuth';

const MyRequestsPage = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = () => {
        fetch('http://localhost:3001/requests')
        .then(res => res.json())
        .then(data => {
            if (user?.role === 'admin') {
                setRequests(data);
            } else {
                setRequests(data.filter(r => r.userId === user?.id || r.userEmail === user?.email));
            }
            setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchRequests();
    }, [user]);

    const handleUpdateStatus = (reqId, newStatus, newComment) => {
        fetch(`http://localhost:3001/requests/${reqId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus, adminComment: newComment })
        }).then(() => fetchRequests());
    };

    return (
        <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-700 pb-4">
        <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <FileText className="w-6 h-6 text-unt-blue dark:text-unt-gold" />
        {user?.role === 'admin' ? 'Todas las Solicitudes (Vista Administrador)' : 'Mis Solicitudes de Capacitación'}
        </h1>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
        Gestione el historial de postulaciones a becas y monitoree el estado dictaminado por los departamentos.
        </p>
        </div>

        <Link
        to="/solicitar-capacitacion"
        className="inline-flex items-center gap-2 px-4 py-2 bg-unt-blue hover:bg-unt-blue-dark text-white text-xs font-semibold rounded-lg shadow transition shrink-0"
        >
        <PlusCircle className="w-4 h-4" /> Nueva Solicitud
        </Link>
        </div>

        {loading ? (
            <div className="p-8 text-center text-xs text-gray-500 animate-pulse">Cargando expediente de solicitudes...</div>
        ) : (
            <RequestList
            requests={requests}
            onUpdateStatus={handleUpdateStatus}
            isAdmin={user?.role === 'admin'}
            />
        )}
        </div>
    );
};

export default MyRequestsPage;
