import { createContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const rawUser = localStorage.getItem('samidha_user');
    return rawUser ? JSON.parse(rawUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('samidha_token'));

  const login = (authData) => {
    const userData = {
      _id: authData._id,
      name: authData.name,
      email: authData.email,
      phoneno: authData.phoneno,
    };
    setUser(userData);
    setToken(authData.token);
    localStorage.setItem('samidha_user', JSON.stringify(userData));
    localStorage.setItem('samidha_token', authData.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('samidha_user');
    localStorage.removeItem('samidha_token');
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      user,
      token,
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
