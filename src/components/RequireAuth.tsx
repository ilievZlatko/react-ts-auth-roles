import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface IProps {
  allowedRoles: number[];
}

const RequireAuth: React.FC<IProps> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.roles?.find((role: any) => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.username
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
