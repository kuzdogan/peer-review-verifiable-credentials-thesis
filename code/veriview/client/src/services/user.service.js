import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3010/v1/users';

export const getUserById = (userId) => axios.get(`${API_URL}/${userId}`, { headers: authHeader() }).then((res) => res.data);
