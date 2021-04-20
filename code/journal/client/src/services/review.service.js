import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/v1/reviews';

export const createReview = (review) => axios.post(`${API_URL}`, review, { headers: authHeader() }).then((res) => res.data);

export const readReview = (reviewId) => axios.get(`${API_URL}/${reviewId}`, { headers: authHeader() }).then((res) => res.data);

export const readReviews = (queryObj) =>
  axios.get(`${API_URL}`, { headers: authHeader(), params: queryObj }).then((res) => res.data);
