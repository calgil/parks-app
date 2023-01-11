import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserFetch } from "../fetch/user/getUserFetch";
import { registerFetch } from "../fetch/user/registerFetch";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const findUserInStorage = async () => {
    const potentialUser = localStorage.getItem("user");
    if (!potentialUser) {
      return setIsLoading(false);
    }
    const storedUser = JSON.parse(potentialUser);
    const { username } = storedUser;
    try {
      const user = await getUserFetch({ username });
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      localStorage.removeItem("user");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findUserInStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isLoading }}>
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
    isLoading: context.isLoading,
  };
};
