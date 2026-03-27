'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('aurika-user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      localStorage.setItem('aurika-user', JSON.stringify(data.user));
      localStorage.setItem('aurika-token', data.token);
    }
    return data;
  };

  const register = async (name, email, password, phone) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone }),
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      localStorage.setItem('aurika-user', JSON.stringify(data.user));
      localStorage.setItem('aurika-token', data.token);
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aurika-user');
    localStorage.removeItem('aurika-token');
  };

  const getToken = () => localStorage.getItem('aurika-token');

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
