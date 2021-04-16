import axios from 'axios';

const API_URL = 'http://localhost:3000/v1/auth';

export const register = (name, email, password) =>
  axios
    .post(`${API_URL}/register`, {
      name,
      email,
      password,
    })
    .then((response) => {
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('accessToken', response.data.tokens.access.token);
        localStorage.setItem('accessExpires', response.data.tokens.access.expires);
        localStorage.setItem('refreshToken', JSON.stringify(response.data.tokens.refresh.token));
        localStorage.setItem('refreshExpires', response.data.tokens.refresh.expires);
      }

      return response.data;
    });

export const login = (email, password) =>
  axios
    .post(`${API_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('accessToken', response.data.tokens.access.token);
        localStorage.setItem('accessExpires', JSON.stringify(response.data.tokens.access.expires));
        localStorage.setItem('refreshToken', response.data.tokens.refresh.token);
        localStorage.setItem('refreshExpires', JSON.stringify(response.data.tokens.refresh.expires));
        window.location.replace('/');
      }

      return response.data;
    });

export const logout = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return axios.post(`${API_URL}/logout`, { refreshToken }).then(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessExpires');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshExpires');
    window.location.replace('/login');
  });
};

export const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

export const isLoggedIn = () => !!localStorage.getItem('accessToken');
