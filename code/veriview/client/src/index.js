import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/styles/tailwind.css';
import PrivateRoute from 'components/PrivateRoute';
// layouts
import Admin from 'layouts/Admin.js';
import Auth from 'layouts/Auth.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Profile from 'views/Profile';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path='/auth' component={Auth} />
      <Route path='/profile/:userId' component={Profile} />
      <PrivateRoute path='/' component={Admin} />
      {/* add redirect for first page */}
      <Redirect from='*' to='/' />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
