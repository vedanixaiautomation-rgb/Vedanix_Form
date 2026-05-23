import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("vedanix_token"));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("vedanix_user");
    return stored ? JSON.parse(stored) : null;
  });

  const value = useMemo(
    () => ({
      token,
      user,
      async login(email, password) {
        const data = await api("/auth/login", { method: "POST", body: { email, password } });
        localStorage.setItem("vedanix_token", data.token);
        localStorage.setItem("vedanix_user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return data.user;
      },
      async signup(payload) {
        const data = await api("/auth/signup", { method: "POST", body: payload });
        localStorage.setItem("vedanix_token", data.token);
        localStorage.setItem("vedanix_user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return data.user;
      },
      logout() {
        localStorage.removeItem("vedanix_token");
        localStorage.removeItem("vedanix_user");
        setToken(null);
        setUser(null);
      }
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
