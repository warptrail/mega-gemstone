const AuthService = {
  async checkTokenValidity(token) {
    const res = await fetch('http://localhost:8082/api/auth/verified', {
      method: 'GET',
      headers: {
        token,
      },
    });
    const validityCheckRes = await res.json();
    return validityCheckRes;
  },
  async renewToken(token) {
    const res = await fetch(`http://localhost:8082/api/auth/refresh`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', token },
    });
    const refreshToken = await res.json();
    console.log('token has been refreshed');
    return refreshToken;
  },
};

export default AuthService;
