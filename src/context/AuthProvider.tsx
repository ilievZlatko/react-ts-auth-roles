import { createContext, useState } from 'react';

interface IAuth {
  user: string;
  pwd: string;
  accessToken: string;
  roles: number[];
}

export interface AuthProps {
  auth: IAuth;
  setAuth: React.Dispatch<IAuth>;
}

const defaultAuthValue: IAuth = {
  user: '',
  pwd: '',
  accessToken: '',
  roles: []
};

const defaultValue: AuthProps = {
  auth: defaultAuthValue,
  setAuth: (state: IAuth) => {}
};

const AuthContext = createContext(defaultValue);

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<IAuth>(defaultAuthValue);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
