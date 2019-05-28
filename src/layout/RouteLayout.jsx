import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import Dashboard from './dashboard';

const RouteLayout = ({ component: Component, ...rest }) => {
  console.log("RouteLayout");
  //todo: logic for validate user 

  return (
    <Route {...rest} render={matchProps => (
      <Dashboard>
        <Component {...matchProps} />
      </Dashboard>
    )} />
  )
};

export default RouteLayout;
