import FooterAdmin from 'components/Footers/FooterAdmin.js';
// components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// views
import Dashboard from 'views/admin/Dashboard.js';
import Reviews from 'views/admin/Reviews.js';
import Settings from 'views/admin/Settings.js';
import Profile from 'views/Profile';
import UserContext from '../UserContext';

export default function Admin() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Sidebar />
      <div className='relative md:ml-64 bg-blueGray-100 flex-col flex'>
        <AdminNavbar />
        <div className='px-4 md:px-10 mx-auto w-full mt-24 flex flex-col flex-1'>
          <Switch>
            <Route path='/profile' exact component={Profile} />
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/settings' exact component={Settings} />
            <Route path='/reviews' exact component={Reviews} />
            <Redirect from='/' to='/dashboard' />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </UserContext.Provider>
  );
}
