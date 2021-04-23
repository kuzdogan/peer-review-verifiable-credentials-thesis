import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/v1/reviewTasks';

export const createReviewTask = (reviewTask) =>
  axios.post(`${API_URL}`, reviewTask, { headers: authHeader() }).then((res) => res.data);

export const readReviewTask = (reviewTaskId) =>
  axios.get(`${API_URL}/${reviewTaskId}`, { headers: authHeader() }).then((res) => res.data);

export const readReviewTasks = (queryObj) =>
  axios.get(`${API_URL}`, { headers: authHeader(), params: queryObj }).then((res) => res.data);
