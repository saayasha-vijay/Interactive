import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'citizen' | 'operator' | 'supervisor' | 'dispatch' | null;

interface AuthContextType {
  role: UserRole;
  isGuest: boolean;
  login: (role: UserRole, isGuest?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('user_role') as UserRole) || null;
  });
  const [isGuest, setIsGuest] = useState<boolean>(() => {
    return localStorage.getItem('is_guest') === 'true';
  });

  const login = (newRole: UserRole, guest: boolean = false) => {
    setRole(newRole);
    setIsGuest(guest);
    localStorage.setItem('user_role', newRole || '');
    localStorage.setItem('is_guest', guest.toString());
  };

  const logout = () => {
    setRole(null);
    setIsGuest(false);
    localStorage.removeItem('user_role');
    localStorage.removeItem('is_guest');
  };

  return (
    <AuthContext.Provider value={{ role, isGuest, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
