import React, { createContext, useState, useEffect } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(() => {
        // Notificaciones iniciales de respaldo
        setNotifications([
          {
            id: 'notif-1',
            type: 'urgent',
            title: '⚠️ Sustentación Próxima (Urgente)',
            message: 'La sustentación de Bach. Gabriel Eduardo Benavides Silva es en 2 días.',
            read: false,
            createdAt: new Date().toISOString()
          },
          {
            id: 'notif-2',
            type: 'reminder',
            title: '📅 Recordatorio de Sustentación',
            message: 'Faltan 18 días para la sustentación de Bach. Mateo Alexander Castillo Ríos.',
            read: false,
            createdAt: new Date().toISOString()
          }
        ]);
      });
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};