const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const reviewRoute = require('./review.route');
const manuscriptRoute = require('./manuscript.route');
const reviewTaskRoute = require('./reviewTask.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/reviews',
    route: reviewRoute,
  },
  {
    path: '/manuscripts',
    route: manuscriptRoute,
  },
  {
    path: '/reviewTasks',
    route: reviewTaskRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
