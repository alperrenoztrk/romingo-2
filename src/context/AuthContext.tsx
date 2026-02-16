import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthUserType = "guest" | null;

type AuthContextValue = {
  isAuthenticated: boolean;
  userType: AuthUserType;
  loginAsGuest: () => void;
  logout: () => void;
};

const AUTH_STORAGE_KEY = "romingo-auth-user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<AuthUserType>(null);

  useEffect(() => {
    const savedUserType = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedUserType === "guest") {
      setUserType("guest");
    }
  }, []);

  const loginAsGuest = () => {
    localStorage.setItem(AUTH_STORAGE_KEY, "guest");
    setUserType("guest");
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUserType(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: userType !== null,
      userType,
      loginAsGuest,
      logout,
    }),
    [userType],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
