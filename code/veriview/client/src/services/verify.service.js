import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3010/v1/verify';

// Verify derived proof server side.
export const verifyDerivedProof = (reviewProof) =>
  axios.post(`${API_URL}`, reviewProof, { headers: authHeader() }).then((res) => res.data);
