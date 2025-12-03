import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Lobby from '../pages/Lobby';
import Room from '../pages/Room';
import Storage from '../pages/Storage';
import { useAuth } from '../hooks/useAuth';

export function AppRouter() {

  const { isAuth } = useAuth()

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    {
      path: '/login',
      element: (
        <GuestRoute isAuth={isAuth}>
          <Login />
        </GuestRoute>
      ),
    },
    {
      path: '/register',
      element: (
        <GuestRoute isAuth={isAuth}>
          <Register />
        </GuestRoute>
      ),
    },
    { //Este es mas tricky todavia porque no creo que le haga falta auth necesita un contexto que el acceso sea desde join room o create room no poniendo la ruta por la cara, pero claro, si creas ese contexto si refrescas la pagina deja de funcionar
      path: '/lobby', // Esto lo cambiaremos luego a /lobby/:id sera el hash que se genere para el modelo de Room
      element: (
        <ProtectedRoute isAuth={isAuth}>
          <Lobby />
        </ProtectedRoute>
      ),
    },
    {
      path: '/room', // Esto lo cambiaremos luego a /room/:id sera el hash que se genere para el modelo de Room
      element: (
        <ProtectedRoute isAuth={isAuth}>
          <Room />
        </ProtectedRoute>
      ),
    },
    {
      path: '/storage', // Esto lo cambiaremos luego a /room/:id sera el nombre del Usuario
      element: (
        <ProtectedRoute isAuth={isAuth}>
          <Storage />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
