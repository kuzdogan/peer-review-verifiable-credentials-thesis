const roles = ['user', 'editor', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], [
  'getReviews',
  'postReview',
  'getManuscripts',
  'postManuscript',
  'getReviewTasks',
  'respondReviewTasks',
]);
roleRights.set(roles[1], [
  'getReviews',
  'manageReviews',
  'getManuscripts',
  'manageManuscripts',
  'getReviewTasks',
  'postReviewTask',
  'manageReviewTasks',
  'getUsers',
]);
roleRights.set(roles[2], [
  'getReviews',
  'manageReviews',
  'getManuscripts',
  'manageManuscripts',
  'getReviewTasks',
  'postReviewTask',
  'manageReviewTasks',
  'getUsers',
  'manageUsers',
]);

module.exports = {
  roles,
  roleRights,
};
