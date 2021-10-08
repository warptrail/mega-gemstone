import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth-api-service';
import TokenService from '../services/token-service';

const Register = ({ setAuth, setValidityCheck }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    passwordC: '',
  });
  const [error, setError] = useState(null);

  const { username, password, passwordC } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      console.log(username, password, passwordC);
      if (password !== passwordC) {
        throw new Error('Passwords do not match');
      }
      const body = { username, password };

      const response = await fetch('http://localhost:8082/api/auth/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });

      const resOk = response.ok;
      const parseResponse = await response.json(); // converts jwt the response to json

      if (!resOk) {
        TokenService.clearAuthToken();
        setError(parseResponse);
        setInputs({ username: '', password: '' });
      }

      // set the jwt to local storage
      console.log(parseResponse);

      sessionStorage.setItem('token', parseResponse.token);
      const validityCheck = await AuthService.checkTokenValidity(
        sessionStorage.getItem('token')
      );
      setValidityCheck(validityCheck);
      if (validityCheck.isVerified) {
        setAuth(true);
      }
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="Register">
      <h2>Register</h2>
      <form className="d-grid gap-3 mx-5" onSubmit={onSubmitForm}>
        <input
          className="form-control "
          type="text"
          name="username"
          placeholder="username"
          value={username}
          required
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          required
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control"
          type="password"
          name="passwordC"
          placeholder="password again"
          value={passwordC}
          required
          onChange={(e) => onChange(e)}
        />
        <button type="submit" className="btn btn-success btn-block">
          Register
        </button>
        <p className="err-msg">{error ? JSON.stringify(error) : null}</p>
      </form>
      <hr />

      <Link to="/login" className="btn btn-primary btn-block d-grid mx-5 mt-3">
        Login
      </Link>
    </div>
  );
};

export default Register;
