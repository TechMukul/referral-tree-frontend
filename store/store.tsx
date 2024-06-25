"use client";

import React, { createContext, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  storeToken: (serverToken: string) => void;
  removeToken: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storeToken = (serverToken: string) => {
    localStorage.setItem("token", serverToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      removeToken();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ storeToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
