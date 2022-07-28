import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import { useRefresh } from './api/auth';
import { useAppContext } from './providers/ContextProvider';
import useStorageToken from './hooks/useStorageToken';

import './index.css';

function App() {
  const { setAdmin } = useAppContext();
  const [oldToken, setRefreshToken] = useStorageToken('refreshToken', '');
  const [, setAccessToken] = useStorageToken('accessToken', '');

  const { mutate: refresh, isSuccess, data, isLoading } = useRefresh();

  useEffect(() => {
    setAdmin((prev) => ({ ...prev, isAuthInProgress: isLoading }));
  }, [isLoading, setAdmin]);

  useEffect(() => {
    if (oldToken) {
      refresh(oldToken);
    }
  }, []);

  useEffect(() => {
    try {
      if (isSuccess) {
        const res = data?.data?.data?.admin;
        const { accessToken, refreshToken } = data?.data?.data?.tokens;

        setAdmin(() => ({ ...res, isAuthInProgress: isLoading, isLoggedIn: true, accessToken, refreshToken }));
        setRefreshToken(refreshToken);
        setAccessToken(accessToken);
      }
    } catch (error) {
      console.log('App ' + error);
    }
  }, [isSuccess, setAdmin, data]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
