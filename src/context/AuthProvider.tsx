import { createContext, useState } from 'react';
import { User } from '../types';

export interface AuthProps {
  auth: User | null;
  setAuth: (state: User | null) => void;
}

const defaultAuthValue: User | null = null;

const defaultValue: AuthProps = {
  auth: defaultAuthValue,
  setAuth: (state: User | null) => {},
};

const AuthContext = createContext(defaultValue);

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<User | null>(defaultAuthValue);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
