export interface MiddlewareRouteProps {
  isAuth: boolean;
  children: React.ReactNode;
}

export interface AuthContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}