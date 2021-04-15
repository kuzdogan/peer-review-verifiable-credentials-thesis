import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/v1/manuscripts';

export const createManuscript = (manuscript) => axios.post(`${API_URL}`, { manuscript }, { headers: authHeader() });

export const readManuscript = (manuscriptId) => axios.get(`${API_URL}/${manuscriptId}`, { headers: authHeader() });

export const readManuscripts = (filter) => axios.get(`${API_URL}`, { headers: authHeader(), params: filter });
