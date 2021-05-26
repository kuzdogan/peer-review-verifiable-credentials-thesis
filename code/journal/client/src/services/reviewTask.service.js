import axios from 'axios';
import authHeader from './auth-header';

const API_PREFIX = '/v1/reviewTasks';

export const createReviewTask = (reviewTask) =>
  axios.post(`${API_PREFIX}`, reviewTask, { headers: authHeader() }).then((res) => res.data);

export const readReviewTask = (reviewTaskId) =>
  axios.get(`${API_PREFIX}/${reviewTaskId}`, { headers: authHeader() }).then((res) => res.data);

export const readReviewTasks = (queryObj) =>
  axios.get(`${API_PREFIX}`, { headers: authHeader(), params: queryObj }).then((res) => res.data);
