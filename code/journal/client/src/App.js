import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PageTitle from './components/PageTitle';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ManuscriptsPage from './pages/ManuscriptsPage';
import RegisterPage from './pages/RegisterPage';
import ReviewsPage from './pages/ReviewsPage';
import SubmitManuscriptPage from './pages/SubmitManuscriptPage';
import { isLoggedIn } from './services/auth.service';
import UserContext from './UserContext';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='flex flex-row'>
        {isLoggedIn() ? <Sidebar /> : null}
        <div className='h-screen w-full bg-gray-50 flex flex-col flex-1'>
          <PageTitle />
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <PrivateRoute exact path={['/', '/home']} component={Home} />
            <PrivateRoute exact path='/reviews' component={ReviewsPage} />
            <PrivateRoute exact path='/manuscripts' component={ManuscriptsPage} />
            <PrivateRoute exact path='/manuscripts/submit' component={SubmitManuscriptPage} />
          </Switch>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
