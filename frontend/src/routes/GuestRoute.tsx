import { Navigate } from 'react-router-dom';
import type { MiddlewareRouteProps } from '../types/props';

export const GuestRoute = ({ isAuth, children }: MiddlewareRouteProps) => {
  if (isAuth) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
