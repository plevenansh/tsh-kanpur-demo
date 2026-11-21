"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "member" | "admin" | null;

interface AuthUser {
  name: string;
  email: string;
  role: Role;
  initials: string;
  plan?: string;
  sport?: string;
  memberId?: string;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  user: AuthUser | null;
  role: Role;
  login: (email: string, password: string, asAdmin?: boolean) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  phone: string;
  sport: string;
  plan: string;
}

// ─── Demo Credentials ─────────────────────────────────────────────────────────
const DEMO_MEMBER: AuthUser = {
  name: "Ravi Patel",
  email: "ravi@tsh.com",
  role: "member",
  initials: "RP",
  plan: "Annual",
  sport: "Badminton",
  memberId: "TSH-2024-0001",
};

const DEMO_ADMIN: AuthUser = {
  name: "Admin User",
  email: "admin@tsh.com",
  role: "admin",
  initials: "AU",
};

const MEMBER_CREDENTIALS = { email: "ravi@tsh.com", password: "demo123" };
const ADMIN_CREDENTIALS = { email: "admin@tsh.com", password: "admin123" };
const STORAGE_KEY = "tsh-auth";

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  user: null,
  role: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AuthUser;
        setUser(parsed);
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const persist = (u: AuthUser | null) => {
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setUser(u);
  };

  const login = async (email: string, password: string, asAdmin = false): Promise<boolean> => {
    // Simulate async network call
    await new Promise((r) => setTimeout(r, 900));

    if (asAdmin) {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        persist(DEMO_ADMIN);
        return true;
      }
      return false;
    }

    if (email === MEMBER_CREDENTIALS.email && password === MEMBER_CREDENTIALS.password) {
      persist(DEMO_MEMBER);
      return true;
    }

    return false;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1200));
    const initials = data.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const newUser: AuthUser = {
      name: data.name,
      email: data.email,
      role: "member",
      initials,
      plan: data.plan,
      sport: data.sport,
      memberId: `TSH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    persist(newUser);
    return true;
  };

  const logout = () => {
    persist(null);
  };

  if (!loaded) return null; // avoid flash before hydration

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        role: user?.role ?? null,
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
  return useContext(AuthContext);
}
