import axios from 'axios';
import authHeader from './auth-header';

const API_PREFIX = '/v1/manuscripts';

export const createManuscript = (manuscriptObj) => axios.post(`${API_PREFIX}`, manuscriptObj, { headers: authHeader() });

export const readManuscript = (manuscriptId) =>
  axios.get(`${API_PREFIX}/${manuscriptId}`, { headers: authHeader() }).then((response) => response.data);

export const readManuscripts = (queryObj) =>
  axios
    .get(`${API_PREFIX}`, { headers: authHeader(), params: { ...queryObj, populate: 'author,reviews,reviewers' } })
    .then((response) => response.data);

export const readOwnManuscripts = () =>
  axios
    .get(`${API_PREFIX}`, {
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
    `${API_PREFIX}/${manuscript.id}`,
    { reviewers: [...reviewersIds, ...newReviewerIds], status: 'In Review' },
    { headers: authHeader() }
  );
};

export const updateManuscript = (id, updateBody) =>
  axios.patch(`${API_PREFIX}/${id}`, updateBody, { headers: authHeader() }).then((response) => response.data);
