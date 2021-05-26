import axios from 'axios';
import authHeader from './auth-header';

const API_PREFIX = 'v1/reviewProofs';

export const createReviewProof = (reviewProof) =>
  axios.post(`${API_PREFIX}`, reviewProof, { headers: authHeader() }).then((res) => res.data);

export const readReviewProof = (reviewProofId) =>
  axios.get(`${API_PREFIX}/${reviewProofId}`, { headers: authHeader() }).then((res) => res.data);

export const readReviewProofs = (queryObj) =>
  axios.get(`${API_PREFIX}`, { headers: authHeader(), params: queryObj }).then((res) => res.data);

export const deleteReviewProof = (reviewProofId) =>
  axios.delete(`${API_PREFIX}/${reviewProofId}`, { headers: authHeader() }).then((res) => res.data);
