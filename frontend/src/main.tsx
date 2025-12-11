import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './routes/Router';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { initializeAuth } from './store/authSlice';

store.dispatch(initializeAuth());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
