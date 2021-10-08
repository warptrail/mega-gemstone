import React, { useState, useEffect } from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import TokenService from './services/token-service';
import IdleService from './services/idle-service';
import AuthService from './services/auth-api-service';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Nav from './components/Nav';

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
    <div className="App">
      <Router>
        <header>
          <h1 className="h1 display-1 px-3">Welcome to the Cryochamber</h1>
          <Nav
            isAuthenticated={isAuthenticated}
            setAuth={setAuth}
            setValidityCheck={setValidityCheck}
          />
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              !isAuthenticated ? (
                <Home {...props} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />

          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login
                  {...props}
                  setAuth={setAuth}
                  setValidityCheck={setValidityCheck}
                />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register
                  {...props}
                  setAuth={setAuth}
                  setValidityCheck={setValidityCheck}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard
                  {...props}
                  setAuth={setAuth}
                  setValidityCheck={setValidityCheck}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
