import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Signin from './components/Signin';
import Signup from './components/Signup';

const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

export default ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route
              path='/auth/signin'
              render={(props) => <Signin {...props} onSignIn={onSignIn} />}
            />
            <Route
              path='/auth/signup'
              render={(props) => <Signup {...props} onSignIn={onSignIn} />}
            />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
