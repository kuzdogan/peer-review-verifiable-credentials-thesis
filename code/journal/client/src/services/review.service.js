import axios from 'axios';
import authHeader from './auth-header';

const API_PREFIX = '/v1/reviews';

export const createReview = (review) => axios.post(`${API_PREFIX}`, review, { headers: authHeader() }).then((res) => res.data);

export const readReview = (reviewId) => axios.get(`${API_PREFIX}/${reviewId}`, { headers: authHeader() }).then((res) => res.data);

export const readReviews = (queryObj) =>
  axios.get(`${API_PREFIX}`, { headers: authHeader(), params: queryObj }).then((res) => res.data);

export const issueCredential = (reviewId) =>
  axios.get(`${API_PREFIX}/credential/${reviewId}`, { headers: authHeader() }).then((res) => res.data);
