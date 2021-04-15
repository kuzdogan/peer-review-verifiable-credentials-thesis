import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserContext from './UserContext';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='flex flex-row'>
        <Sidebar />
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
