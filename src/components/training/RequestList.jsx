import React, { useState } from 'react';
import RequestCard from './RequestCard';
import RequestDetailModal from './RequestDetailModal';
import { Search, Filter, FolderOff } from 'lucide-react';

const RequestList = ({ requests = [], onUpdateStatus, isAdmin = false }) => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [searchFilter, setSearchFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');

    const filteredRequests = requests.filter(r => {
        const matchesSearch = r.trainingName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        r.institution.toLowerCase().includes(searchFilter.toLowerCase()) ||
        r.userName?.toLowerCase().includes(searchFilter.toLowerCase());
        const matchesStatus = statusFilter === 'Todos' || r.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-72">
        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        <input
        type="text"
        placeholder="Buscar por programa o institución..."
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
        />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter className="w-4 h-4 text-gray-400" />
        <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="py-2 px-3 text-xs rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white w-full sm:w-auto"
        >
        <option value="Todos">Todos los estados</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En Revisión">En Revisión</option>
        <option value="Aprobado">Aprobado</option>
        <option value="Rechazado">Rechazado</option>
        </select>
        </div>
        </div>

        {filteredRequests.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 p-12 rounded-xl text-center border border-gray-200 dark:border-slate-700">
            <FolderOff className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
            <h4 className="font-bold text-gray-700 dark:text-slate-300 text-base">No se encontraron solicitudes</h4>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Intente cambiar los filtros o busque con otros términos.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRequests.map(req => (
                <RequestCard
                key={req.id}
                request={req}
                onView={(r) => setSelectedRequest(r)}
                />
            ))}
            </div>
        )}

        {selectedRequest && (
            <RequestDetailModal
            request={selectedRequest}
            isOpen={!!selectedRequest}
            onClose={() => setSelectedRequest(null)}
            onUpdateStatus={onUpdateStatus}
            isAdmin={isAdmin}
            />
        )}
        </div>
    );
};

export default RequestList;
