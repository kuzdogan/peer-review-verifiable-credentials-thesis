import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3010/v1/reviewProofs';

export const createReviewProof = (reviewProof) =>
  axios.post(`${API_URL}`, reviewProof, { headers: authHeader() }).then((res) => res.data);

export const readReviewProof = (reviewProofId) =>
  axios.get(`${API_URL}/${reviewProofId}`, { headers: authHeader() }).then((res) => res.data);

export const readReviewProofs = (queryObj) =>
  axios.get(`${API_URL}`, { headers: authHeader(), params: queryObj }).then((res) => res.data);

export const deleteReviewProof = (reviewProofId) =>
  axios.delete(`${API_URL}/${reviewProofId}`, { headers: authHeader() }).then((res) => res.data);
