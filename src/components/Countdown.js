import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import TokenService from '../services/token-service';
const Countdown = ({ expire, setValidityCheck, setAuth }) => {
  const [timeLeft, setTimeLeft] = useState(Infinity);

  useEffect(() => {
    const calculateTImeLeft = () => {
      const now = dayjs().unix();
      let difference = expire - now;
      return difference;
    };
    const timer = setTimeout(() => {
      setTimeLeft(calculateTImeLeft());
    }, 1000);

    if (timeLeft <= 0) {
      clearTimeout(timer);
      TokenService.clearAuthToken();
      setValidityCheck({});
      setAuth(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [expire, timeLeft, setAuth, setValidityCheck]);

  return (
    <p>
      You will be logged out in <span>{timeLeft}</span> seconds
    </p>
  );
};

export default Countdown;
