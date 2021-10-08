import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import AuthService from '../services/auth-api-service';

const Login = ({ setAuth, setValidityCheck }) => {
  const [inputs, setInputs] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const { username, password } = inputs;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // * get user credentials for the body of the request
      // originates from inputs state
      const body = { username, password };

      // * await the response to request an authentication token
      const response = await fetch('http://localhost:8082/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });

      // * parse the token
      const parseResponse = await response.json();

      console.log('parse the token', parseResponse);
      // * check the token is valid by returning an object
      // this object only tells is authenticate or not, does not contain hash
      const validateCheck = await AuthService.checkTokenValidity(
        parseResponse.token
        // 'not-a-real-token-to-test-validation'
      );

      console.log(validateCheck);

      // *if the token is not valid
      if (validateCheck.error) {
        // * alert the error message from server
        const error = {
          error: !!validateCheck.error,
          message: validateCheck.message,
        };
        console.error('validation failed', error);
        // * remove any token in local storage
        TokenService.clearAuthToken();
        setValidityCheck({ error: true });
        setError(JSON.stringify(error));
      }

      // *if the token is valid
      if (validateCheck.isVerified === true) {
        // * get the token from the response
        const tokenFromLogin = parseResponse.token;
        // * set the token to session storage
        TokenService.saveAuthToken(tokenFromLogin);
        setValidityCheck({ ...validateCheck });
        setAuth(true);
      }
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form className="d-grid gap-3 mx-5" onSubmit={onSubmitForm}>
        <input
          className="form-control "
          type="text"
          name="username"
          required
          placeholder="username"
          value={username}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button type="submit" className="btn btn-success btn-block">
          Login
        </button>
        <p className="err-msg">{error}</p>
      </form>
      <hr />

      <Link
        to="/register"
        className="btn btn-primary btn-block d-grid mx-5 mt-3"
      >
        Register
      </Link>
    </div>
  );
};

export default Login;
