import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/v1/reviews';

export const createReview = (review) => axios.post(`${API_URL}`, { review }, { headers: authHeader() });

export const readReview = (reviewId) => axios.get(`${API_URL}/${reviewId}`, { headers: authHeader() });

export const readReviews = (queryObj) => axios.get(`${API_URL}`, { headers: authHeader(), params: queryObj });
