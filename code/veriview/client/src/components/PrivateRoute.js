/* eslint-disable react/jsx-props-no-spreading */
// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLoggedIn } from '../services/auth.service';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
      }
    />
  );
}

export default PrivateRoute;
