import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/v1/manuscripts';

export const createManuscript = (manuscriptObj) => axios.post(`${API_URL}`, manuscriptObj, { headers: authHeader() });

export const readManuscript = (manuscriptId) =>
  axios.get(`${API_URL}/${manuscriptId}`, { headers: authHeader() }).then((response) => response.data);

export const readManuscripts = (queryObj) =>
  axios
    .get(`${API_URL}`, { headers: authHeader(), params: { ...queryObj, populate: 'author,reviews,reviewers' } })
    .then((response) => response.data);

export const readOwnManuscripts = () =>
  axios
    .get(`${API_URL}`, {
      headers: authHeader(),
      params: {
        author: JSON.parse(localStorage.getItem('user')).id,
        populate: 'author',
      },
    })
    .then((response) => response.data);

export const assignReviewersToManuscript = (manuscript, newReviewerIds) => {
  const reviewersIds = manuscript.reviewers.map((reviewer) => reviewer.id);
  return axios.patch(
    `${API_URL}/${manuscript.id}`,
    { reviewers: [...reviewersIds, ...newReviewerIds], status: 'In Review' },
    { headers: authHeader() }
  );
};
