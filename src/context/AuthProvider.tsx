import { createContext, useState } from 'react';
import { User } from '../types';

export interface AuthProps {
  persist: boolean;
  auth: User | null;
  setAuth: (state: User | null) => void;
  setPersist: (state: boolean) => void;
}

const defaultAuthValue: User | null = null;

const defaultValue: AuthProps = {
  persist: false,
  auth: defaultAuthValue,
  setAuth: (state: User | null) => {},
  setPersist: (state: boolean) => {}
};

const AuthContext = createContext(defaultValue);

export const AuthProvider: React.FC = ({ children }) => {
  const persistItem = localStorage.getItem('persist');
  const [auth, setAuth] = useState<User | null>(defaultAuthValue);
  const [persist, setPersist] = useState<boolean>(persistItem ? JSON.parse(persistItem) : false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
