"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User } from "@/types/user-lists";

type AuthContextType = {
  user: User | null;
  onSetUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUserCookie = () => {
      const raw = document.cookie
        .split("; ")
        .find((c) => c.startsWith("admin_user="))
        ?.split("=")[1];

      if (raw) {
        try {
          const decoded = decodeURIComponent(raw).replace(/\+/g, " ");
          const parsed = JSON.parse(decoded);

          setUser(parsed);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUserCookie();
    const interval = setInterval(checkUserCookie, 2000); // check setiap 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, onSetUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
