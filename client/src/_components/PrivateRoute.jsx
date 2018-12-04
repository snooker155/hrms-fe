import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, loggedIn, user, ...rest }) => (
  <Route {...rest} render={props => (
    loggedIn
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
  )} />
)
