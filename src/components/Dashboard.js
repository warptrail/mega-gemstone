import React, { useState, useEffect } from 'react';
import TokenService from '../services/token-service';
import AuthService from '../services/auth-api-service';

import Countdown from './Countdown';
import WidgetGallery from './WidgetGallery';

const Dashboard = ({ setAuth, setValidityCheck }) => {
  const [username, setUsername] = useState('');
  const [userUid, setUserUid] = useState('');
  const [expire, setExpire] = useState(Infinity);
  // const [timeLeft, setTimeLeft] = useState(Infinity);

  const getNameAndExpire = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/dashboard', {
        method: 'GET',
        headers: { token: sessionStorage.token },
      });

      const parseResponse = await response.json();

      setUsername(parseResponse.username);

      const tokenDecrypted = TokenService.parseJwt(sessionStorage.token);
      const expire = tokenDecrypted.exp;
      const user_uid = tokenDecrypted.user_uid;
      setUserUid(user_uid);

      setExpire(expire);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getNameAndExpire();
  }, []);

  const refreshJwt = async () => {
    try {
      const newToken = await AuthService.renewToken(
        TokenService.getAuthToken()
      );
      TokenService.saveAuthToken(newToken.token);
      const tokenDecrypted = TokenService.parseJwt(sessionStorage.token);
      const expire = tokenDecrypted.exp;
      setExpire(expire);
      // setTimeLeft(calculateTImeLeft());
      return newToken;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="Dashboard">
      <h2>Dashboard</h2>
      <h3>Good afternoon, {username}.</h3>
      {expire}
      <Countdown
        expire={expire}
        setAuth={setAuth}
        setValidityCheck={setValidityCheck}
      />
      <button onClick={refreshJwt} className="btn btn-primary">
        Refresh Token
      </button>

      <WidgetGallery userUid={userUid} />
    </div>
  );
};

export default Dashboard;
