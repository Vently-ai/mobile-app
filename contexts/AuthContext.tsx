import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

const AUTH_BASE_URL = 'https://vently-backend.tae5609.site/api';


interface User {
  id: string;
  username: string;
  nickname: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, nickname: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  REFRESH_TOKEN: 'vently_refresh_token',
  ACCESS_TOKEN: 'vently_access_token',
  USER: 'vently_user',
};

async function authRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${AUTH_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Request failed (${response.status})`;
    try {
      const parsed = JSON.parse(errorText);
      errorMessage = parsed.message || parsed.error || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  const saveTokens = async (access: string, refresh: string, userData: User) => {
    await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, access);
    await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refresh);
    await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(userData));
    setAccessToken(access);
    setUser(userData);
  };

  const clearTokens = async () => {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.USER);
    setAccessToken(null);
    setUser(null);
  };

  const restoreSession = async () => {
    try {
      console.log('[restoreSession] Start');
      const storedRefreshToken = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
      const storedAccessToken = await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
      const storedUser = await SecureStore.getItemAsync(STORAGE_KEYS.USER);
      console.log('[restoreSession] Tokens:', { storedRefreshToken, storedAccessToken, storedUser });

      if (!storedRefreshToken) {
        console.log('[restoreSession] No refresh token, skipping session restore.');
        return;
      }

      // Try validating the stored access token first
      if (storedAccessToken && storedUser) {
        try {
          const validated = await authRequest<{ valid: boolean }>(
            '/auth/validate',
            { headers: { Authorization: `Bearer ${storedAccessToken}` } }
          );
          console.log('[restoreSession] Validate result:', validated);
          if (validated.valid) {
            setAccessToken(storedAccessToken);
            setUser(JSON.parse(storedUser));
            console.log('[restoreSession] Session valid, restored.');
            return;
          }
        } catch (err) {
          console.log('[restoreSession] Access token validation failed:', err);
          // Access token expired — fall through to refresh
        }
      }

      // Access token expired, try refreshing
      try {
        const refreshed = await authRequest<{ accessToken: string }>(
          '/auth/refresh',
          {
            method: 'POST',
            body: JSON.stringify({ refreshToken: storedRefreshToken }),
          }
        );
        console.log('[restoreSession] Refreshed token:', refreshed);

        const newAccessToken = refreshed.accessToken;
        await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
        setAccessToken(newAccessToken);

        // Fetch fresh user info with the new token
        const userInfo = await authRequest<User>('/user/info', {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(userInfo));
        setUser(userInfo);
        console.log('[restoreSession] User info refreshed:', userInfo);
      } catch (err) {
        console.log('[restoreSession] Refresh token failed:', err);
        // Refresh token expired or revoked — force re-login
        await clearTokens();
      }
    } finally {
      setIsLoading(false);
      console.log('[restoreSession] Done, isLoading set to false');
    }
  };

  const login = async (username: string, password: string) => {
    const data = await authRequest<{ user: User; accessToken: string; refreshToken: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }
    );
    await saveTokens(data.accessToken, data.refreshToken, data.user);
  };

  const signup = async (username: string, nickname: string, password: string) => {
    const data = await authRequest<{ user: User; accessToken: string; refreshToken: string }>(
      '/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify({ username, nickname, password }),
      }
    );
    await saveTokens(data.accessToken, data.refreshToken, data.user);
  };

  const logout = async () => {
    if (accessToken) {
      try {
        await authRequest('/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } catch {
        // Even if the API call fails, clear local state
      }
    }
    await clearTokens();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user && !!accessToken,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
