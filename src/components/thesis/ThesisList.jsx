import React, { useState } from 'react';
import ThesisCard from './ThesisCard';
import { Search, Filter, GraduationCap } from 'lucide-react';

const ThesisList = ({ theses = [] }) => {
    const [roleFilter, setRoleFilter] = useState('Todos');
    const [stageFilter, setStageFilter] = useState('Todos');
    const [search, setSearch] = useState('');

    const filtered = theses.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.studentName.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === 'Todos' || t.professorRole === roleFilter;
        const matchesStage = stageFilter === 'Todos' || t.stage === stageFilter;
        return matchesSearch && matchesRole && matchesStage;
    });

    return (
        <div className="space-y-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 flex flex-col md:flex-row gap-3 justify-between items-center">
        <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
        <input
        type="text"
        placeholder="Buscar por tesis o estudiante..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
        />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <Filter className="w-4 h-4 text-gray-400" />
        <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="py-2 px-3 text-xs rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
        >
        <option value="Todos">Todos los roles</option>
        <option value="Asesor">Como Asesor</option>
        <option value="Jurado">Como Jurado</option>
        </select>

        <select
        value={stageFilter}
        onChange={(e) => setStageFilter(e.target.value)}
        className="py-2 px-3 text-xs rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
        >
        <option value="Todos">Todas las etapas</option>
        <option value="Proyecto">Proyecto</option>
        <option value="Desarrollo">Desarrollo</option>
        <option value="Borrador Final">Borrador Final</option>
        <option value="Aprobado para Sustentación">Aprobado para Sustentación</option>
        </select>
        </div>
        </div>

        {filtered.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 p-12 rounded-xl text-center border border-gray-200 dark:border-slate-700">
            <GraduationCap className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
            <h4 className="font-bold text-gray-700 dark:text-slate-300 text-base">No hay tesis que coincidan</h4>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Pruebe ajustando el término de búsqueda o seleccionando otro filtro.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(thesis => (
                <ThesisCard key={thesis.id} thesis={thesis} />
            ))}
            </div>
        )}
        </div>
    );
};

export default ThesisList;
