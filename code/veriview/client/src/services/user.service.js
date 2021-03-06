import axios from 'axios';
import authHeader from './auth-header';

const API_PREFIX = '/v1/users';

export const getUserById = (userId) => axios.get(`${API_PREFIX}/${userId}`, { headers: authHeader() }).then((res) => res.data);
