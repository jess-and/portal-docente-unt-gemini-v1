import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThesisDetailView from '../components/thesis/ThesisDetailView';

const ThesisDetailPage = () => {
    const { id } = useParams();
    const [thesis, setThesis] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/theses/${id}`)
        .then(res => res.json())
        .then(data => {
            setThesis(data);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [id]);

    const handleSaveNotes = (thesisId, notes) => {
        fetch(`http://localhost:3001/theses/${thesisId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes })
        });
    };

    if (loading) {
        return <div className="p-8 text-center text-xs text-gray-500 animate-pulse">Cargando detalle de tesis...</div>;
    }

    return <ThesisDetailView thesis={thesis} onSaveNotes={handleSaveNotes} />;
};

export default ThesisDetailPage;
