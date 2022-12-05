import React, { useEffect, useState } from 'react';

import backgroundImg from './img/japanese-gardens.png';

import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';

import AuthService from './services/auth-api-service';
import IdleService from './services/idle-service';
import TokenService from './services/token-service';

import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Nav from './components/Nav';
import Register from './components/Register';

function App() {
  // This state stores if the user is authenticated or not

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [validityCheck, setValidityCheck] = useState({});

  const setAuth = (bool) => {
    setIsAuthenticated(bool);
  };

  useEffect(() => {
    // * 1. check to see if a token exists

    const sessionToken = window.sessionStorage.getItem('token');

    if (!sessionToken) {
      setAuth(false);
    } else if (sessionToken) {
      // console.log(sessionStorageToken);
      // * 2. If token exists, see if it is valid
      // TokenService.readJwtToken(sessionStorageToken);
      const checkValidity = async () => {
        const validityCheckRes = await AuthService.checkTokenValidity(
          sessionToken
          // 'not-a-real-token-to-test-validation'
        );

        console.log(validityCheckRes);
        if (validityCheckRes.isVerified) {
          setValidityCheck(validityCheckRes);
          setAuth(true);
        } else if (validityCheckRes.error) {
          TokenService.clearAuthToken();
          setAuth(false);
        }
      };

      checkValidity();
    }
  }, []);

  return (
    <div
      className="App"
      style={{
        background: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="app-container">
        <header>
          <h1 className="h1 display-1 px-3">Welcome to the Cryochamber</h1>
          <Nav
            isAuthenticated={isAuthenticated}
            setAuth={setAuth}
            setValidityCheck={setValidityCheck}
          />
        </header>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Home isAuthenticated />
              ) : (
                <Login setAuth={setAuth} setValidityCheck={setValidityCheck} />
              )
            }
          />

          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} setValidityCheck={setValidityCheck} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register
                  setAuth={setAuth}
                  setValidityCheck={setValidityCheck}
                />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard
                  setAuth={setAuth}
                  setValidityCheck={setValidityCheck}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
