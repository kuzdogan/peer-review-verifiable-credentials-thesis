import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/v1/manuscripts';

export const createManuscript = (manuscriptObj) => axios.post(`${API_URL}`, manuscriptObj, { headers: authHeader() });

export const readManuscript = (manuscriptId) => axios.get(`${API_URL}/${manuscriptId}`, { headers: authHeader() });

export const readManuscripts = (filter, options) =>
  axios.get(`${API_URL}`, { headers: authHeader(), params: filter, options: { ...options, populate: true } });

export const readOwnManuscripts = () =>
  axios.get(`${API_URL}`, {
    headers: authHeader(),
    params: {
      author: JSON.parse(localStorage.getItem('user')).id,
      populate: 'author',
    },
  });
