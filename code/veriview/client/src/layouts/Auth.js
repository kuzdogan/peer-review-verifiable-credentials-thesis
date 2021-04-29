// components
import Navbar from 'components/Navbars/AuthNavbar.js';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// views
import Login from 'views/auth/Login.js';
import Register from 'views/auth/Register.js';

export default function Auth() {
  return (
    <>
      <Navbar />
      <main>
        <section className='relative w-full h-full py-40 min-h-screen'>
          <div
            className='absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full'
            style={{
              backgroundImage: `url(${require('assets/img/register_bg_2.png').default})`,
            }}
          />
          <Switch>
            <Route path='/auth/login' exact component={Login} />
            <Route path='/auth/register' exact component={Register} />
            <Redirect from='/auth' to='/auth/login' />
          </Switch>
        </section>
      </main>
    </>
  );
}
