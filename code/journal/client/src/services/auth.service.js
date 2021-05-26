import axios from 'axios';

const API_PREFIX = '/v1/auth';

export const register = (firstName, lastName, institution, orcid, email, password) =>
  axios
    .post(`${API_PREFIX}/register`, {
      firstName,
      lastName,
      institution,
      orcid,
      email,
      password,
    })
    .then((response) => {
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('accessToken', response.data.tokens.access.token);
        localStorage.setItem('accessExpires', response.data.tokens.access.expires);
        localStorage.setItem('refreshToken', response.data.tokens.refresh.token);
        localStorage.setItem('refreshExpires', response.data.tokens.refresh.expires);
      }
      window.location.replace('/');
      return response.data;
    });

export const login = (email, password) =>
  axios
    .post(`${API_PREFIX}/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('accessToken', response.data.tokens.access.token);
        localStorage.setItem('accessExpires', response.data.tokens.access.expires);
        localStorage.setItem('refreshToken', response.data.tokens.refresh.token);
        localStorage.setItem('refreshExpires', response.data.tokens.refresh.expires);
        window.location.replace('/');
      }

      return response.data;
    });

export const logout = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return axios.post(`${API_PREFIX}/logout`, { refreshToken }).then(() => {
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
