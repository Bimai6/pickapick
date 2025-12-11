import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  isAuth: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        state.isAuth = true;
        state.token = token;
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
