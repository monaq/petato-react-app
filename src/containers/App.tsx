import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoadingPage } from '../shared';

const HomePage = lazy(() => import('./HomePage'));
const LoginPage = lazy(() => import('./LoginPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
