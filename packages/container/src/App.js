import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from './components/Header';
import Progress from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedin] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    } else {
      history.push('/');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedin(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route
                path='/auth'
                render={() => <AuthLazy onSignIn={() => setIsSignedin(true)} />}
              />
              <Route
                path='/dashboard'
                render={(props) =>
                  !isSignedIn ? <Redirect to='/' /> : <DashboardLazy />
                }
              />
              <Route path='/' component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
