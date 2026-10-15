import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('unt_portal_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('unt_portal_user');
      }
    } else {
      // Usuario demo por defecto
      const defaultUser = {
        id: "usr-1",
        fullName: "Dr. Carlos Alberto Mendoza Ramos",
        email: "cmendoza@unitru.edu.pe",
        dni: "18293847",
        faculty: "Facultad de Derecho y Ciencias Políticas",
        department: "Escuela de Ciencia Política",
        category: "Principal",
        role: "professor",
        token: "jwt-simulated-token-2026-unt"
      };
      setUser(defaultUser);
      localStorage.setItem('unt_portal_user', JSON.stringify(defaultUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(email)}`);
      const users = await res.json();
      if (users && users.length > 0 && users[0].password === password) {
        const userData = { ...users[0], token: 'jwt-token-' + Date.now() };
        setUser(userData);
        localStorage.setItem('unt_portal_user', JSON.stringify(userData));
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, message: 'Credenciales inválidas o correo no registrado.' };
      }
    } catch (error) {
      // Fallback si json-server no está corriendo
      if (email.endsWith('@unitru.edu.pe')) {
        const fallbackUser = {
          id: "usr-1",
          fullName: email.split('@')[0].toUpperCase(),
          email,
          faculty: "Facultad de Derecho y Ciencias Políticas",
          role: "professor",
          token: "jwt-token-fallback"
        };
        setUser(fallbackUser);
        localStorage.setItem('unt_portal_user', JSON.stringify(fallbackUser));
        setLoading(false);
        return { success: true };
      }
      setLoading(false);
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    const newUser = {
      id: `usr-${Date.now()}`,
      ...userData,
      role: 'professor',
      token: 'jwt-token-' + Date.now()
    };
    setUser(newUser);
    localStorage.setItem('unt_portal_user', JSON.stringify(newUser));
    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('unt_portal_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};