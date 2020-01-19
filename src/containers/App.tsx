import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loading } from '../shared';
import Footer from 'components/Footer';
import Header from 'components/Header';

const HomePage = lazy(() => import('../routes/HomePage'));
const LoginPage = lazy(() => import('../routes/LoginPage'));
const FeedPage = lazy(() => import('../routes/FeedPage'));
const NotFoundPage = lazy(() => import('../routes/NotFoundPage'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route path="/login" render={() => <LoginPage />} />
          <Route path="/feeds" render={() => <FeedPage />} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
