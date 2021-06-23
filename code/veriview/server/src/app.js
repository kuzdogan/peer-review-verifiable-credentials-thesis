const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const path = require('path');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// ======== CORS Policy =======
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// Serve client side
if (config.env !== 'development') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  console.log('Serving client');
  app.get('/*', (req, res) => {
    console.log('Responding client');
    res.set(
      'Content-Security-Policy',
      "default-src 'self' journalx.herokuapp.com 'unsafe-inline' 'unsafe-eval'; script-src 'self' journalx.herokuapp.com 'unsafe-inline' 'unsafe-eval'; connect-src 'self' journalx.herokuapp.com 'unsafe-inline'; img-src 'self' journalx.herokuapp.com data: blob: 'unsafe-inline'; frame-src 'self' journalx.herokuapp.com; style-src 'self' journalx.herokuapp.com 'unsafe-inline';"
    );
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
}

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
