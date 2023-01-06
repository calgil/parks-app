import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserFetch } from "../fetch/user/getUserFetch";
import { registerFetch } from "../fetch/user/registerFetch";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async ({ username, password }) => {
    try {
      const user = await registerFetch({ username, password });
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (e) {
      return e;
    }
  };

  const login = async ({ username, password }) => {
    const user = await getUserFetch({ username });
    if (user.password !== password) {
      throw new Error("Invalid password");
    }
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    console.log("user", user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const potentialUser = localStorage.getItem("user");
    if (potentialUser) {
      setUser(JSON.parse(potentialUser));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return {
    user: context.user,
    register: context.register,
    login: context.login,
    logout: context.logout,
  };
};
