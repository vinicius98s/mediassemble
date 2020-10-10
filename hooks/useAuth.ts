import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useLocalStorage from "./useLocalStorage";

type User = {
  name: string;
  username: string;
} | null;

type ReturnValue = {
  user: User;
  setUser: (value: User) => void;
  isAuthenticated: boolean;
  logout: () => void;
};

function useAuth(): ReturnValue {
  const [user, setUser] = useLocalStorage<User>("user", null);
  const [isAuthenticated, setIsAuthenticated] = useState(user !== null);

  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(user !== null);
  }, [user]);

  const logout = () => {
    router.push("/");
    setUser(null);
  };

  return { isAuthenticated, setUser, user, logout };
}

export default useAuth;
