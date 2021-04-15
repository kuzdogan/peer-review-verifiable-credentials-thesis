import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { isLoggedIn } from './services/auth.service';
import UserContext from './UserContext';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='flex flex-row'>
        {isLoggedIn() ? <Sidebar /> : null}
        <div className='h-screen w-full'>
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <PrivateRoute exact path={['/', '/home']} component={Home} />
          </Switch>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
