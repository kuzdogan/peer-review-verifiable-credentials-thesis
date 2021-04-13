const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getReviews', 'postReview', 'getManuscripts', 'postManuscript']);
roleRights.set(roles[1], ['getReviews', 'manageReviews', 'getManuscripts', 'manageManuscripts', 'getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
