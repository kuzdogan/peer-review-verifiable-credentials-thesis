import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3010/v1/verify';

// Verify derived proof server side.
export const verifyDerivedProof = (reviewProof) =>
  axios.post(`${API_URL}/derivedProof/`, reviewProof, { headers: authHeader() }).then((res) => res.data);

// Verify credential server side.
export const verifyReviewCredential = (reviewProof) =>
  axios.post(`${API_URL}/credential/`, reviewProof, { headers: authHeader() }).then((res) => res.data);

export const selectiveDisclose = (signedDocument, revealDocument) =>
  axios
    .post(`${API_URL}/selectiveDisclose/`, { signedDocument, revealDocument }, { headers: authHeader() })
    .then((res) => res.data);
