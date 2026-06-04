'use client';
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { API_URL } from './config';

export interface AuthUser {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  avatar?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoggedIn: boolean;
  hasSubscription: boolean;
  loading: boolean;
  login: (emailOrPhone: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const TOKEN_KEY = 'dt_web_token';
const USER_KEY  = 'dt_web_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]   = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = useCallback(async (tok: string) => {
    try {
      const res = await fetch(`${API_URL}/me/subscription`, {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      const status = data.subscription?.status;
      setHasSubscription(status === 'ACTIVE' || status === 'EXPIRING_SOON');
    } catch {}
  }, []);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser  = localStorage.getItem(USER_KEY);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        fetchSubscription(storedToken);
      }
    } catch {}
    setLoading(false);
  }, [fetchSubscription]);

  const login = useCallback(async (emailOrPhone: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrPhone, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Identifiants incorrects');
    const { user: u, token: tok } = data;
    localStorage.setItem(TOKEN_KEY, tok);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setToken(tok);
    setUser(u);
    await fetchSubscription(tok);
  }, [fetchSubscription]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    setHasSubscription(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn: !!user, hasSubscription, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
