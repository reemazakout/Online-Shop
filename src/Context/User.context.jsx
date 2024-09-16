import { createContext, useState } from "react";

export const UserContext = createContext("");

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }
  return (
    <UserContext.Provider value={{ token, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
}
