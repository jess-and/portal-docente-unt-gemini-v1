import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

import { useAuth } from './hooks/useAuth';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TrainingRequestPage from './pages/TrainingRequestPage';
import MyRequestsPage from './pages/MyRequestsPage';
import ThesisListPage from './pages/ThesisListPage';
import ThesisDetailPage from './pages/ThesisDetailPage';
import NotificationsPage from './pages/NotificationsPage';

const ProtectedLayout = () => {
    const { user, loading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-xs text-gray-500">
            Cargando sistema...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 lg:pl-64 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/solicitar-capacitacion" element={<TrainingRequestPage />} />
        <Route path="/mis-solicitudes" element={<MyRequestsPage />} />
        <Route path="/tesis" element={<ThesisListPage />} />
        <Route path="/tesis/:id" element={<ThesisDetailPage />} />
        <Route path="/notificaciones" element={<NotificationsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        </main>
        </div>
        <Footer />
        </div>
    );
};

export default function App() {
    return (
        <ThemeProvider>
        <AuthProvider>
        <NotificationProvider>
        <BrowserRouter>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
        </BrowserRouter>
        </NotificationProvider>
        </AuthProvider>
        </ThemeProvider>
    );
}
