import { useState, useMemo, createContext } from 'react';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';

const parseAuthToken = () => {
  try {
    if (!window.sessionStorage.getItem('token')) {
      return null;
    }
    const getAuthToken = () => {
      return window.sessionStorage.getItem('token');
    };

    const parseJwt = (jwt) => {
      return jwtDecode(jwt);
    };

    const authToken = getAuthToken();
    if (authToken) {
      return parseJwt(authToken);
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }
};

const jwtPayload = parseAuthToken();
if (jwtPayload) {
  console.log(jwtPayload);
}

export const UserContext = createContext({ user: {}, error: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    user_uid: '',
    username: '',
    expires: dayjs(1633279067 * 1000).format(),
    parseAuthToken,
  });

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
