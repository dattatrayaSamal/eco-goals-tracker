import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setuser(user);
  };
  const logout = () => {
    localStorage.clear();
    setuser(null);
  };
  return (
    <Authcontext.Provider value={{ user, login, logout }}>
      {children}
    </Authcontext.Provider>
  );
};
export const useAuth = () => useContext(Authcontext);
