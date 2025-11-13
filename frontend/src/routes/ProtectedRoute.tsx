import { Navigate } from "react-router-dom";
import type { MiddlewareRouteProps } from "../types/props";

export const ProtectedRoute = ({ isAuth, children }: MiddlewareRouteProps) => {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
