import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PageTitle from './components/PageTitle';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ManageManuscriptReviews from './pages/ManageManuscriptReviews';
import ManageReviewsPage from './pages/ManageReviewsPage';
import ManuscriptsPage from './pages/ManuscriptsPage';
import ManuscriptViewPage from './pages/ManuscriptViewPage';
import RegisterPage from './pages/RegisterPage';
import ReviewsPage from './pages/ReviewsPage';
import StartReviewsPage from './pages/StartReviewsPage';
import SubmitManuscriptPage from './pages/SubmitManuscriptPage';
import ViewReviewPage from './pages/ViewReviewPage';
import WriteReviewPage from './pages/WriteReviewPage';
import { isLoggedIn } from './services/auth.service';
import UserContext from './UserContext';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='flex flex-col md:flex-row'>
        {isLoggedIn() ? <Sidebar /> : null}
        <div className='ml-64 bg-gray-50 flex flex-col flex-1'>
          <PageTitle />
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <PrivateRoute exact path={['/', '/home']} component={Home} />
            <PrivateRoute exact path='/reviews' component={ReviewsPage} />
            <PrivateRoute exact path='/reviews/manage' component={ManageReviewsPage} />
            <PrivateRoute exact path='/reviews/manage/startReview' component={StartReviewsPage} />
            <PrivateRoute exact path='/reviews/write/:reviewTaskId' component={WriteReviewPage} />
            <PrivateRoute exact path='/reviews/:reviewId' component={ViewReviewPage} />
            <PrivateRoute exact path='/manuscripts' component={ManuscriptsPage} />
            <PrivateRoute exact path='/manuscripts/submit' component={SubmitManuscriptPage} />
            <PrivateRoute exact path='/manuscripts/:id/manageReviews' component={ManageManuscriptReviews} />
            <PrivateRoute exact path='/manuscripts/:id' component={ManuscriptViewPage} />
          </Switch>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
