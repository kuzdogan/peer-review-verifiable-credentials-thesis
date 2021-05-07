const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'manageUsers', 'getReviewProofs', 'postReviewProofs', 'manageReviewProofs']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getReviewProofs', 'manageReviewProofs']);

module.exports = {
  roles,
  roleRights,
};
