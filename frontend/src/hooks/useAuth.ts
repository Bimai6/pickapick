import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { login, logout, initializeAuth } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, user, token } = useSelector((state: RootState) => state.auth);

  return {
    isAuth,
    user,
    token,
    login: (user: { id: string; name: string }, token: string) =>
      dispatch(login({ user, token })),
    logout: () => dispatch(logout()),
    initializeAuth: () => dispatch(initializeAuth()),
  };
};
