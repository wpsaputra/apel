import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import Dashboard from './dashboard';

const RouteLayout = ({ component: Component, auth, ...rest }) => {
  console.log("RouteLayout");
  //todo: logic for validate user 

  return (
    // <Route {...rest} render={matchProps => (
    //   <Dashboard>
    //     <Component {...matchProps} />
    //   </Dashboard>
    // )} />
    <Route {...rest} render={matchProps => auth.isSignedIn === true
      ?<Dashboard>
        <Component {...matchProps} />
      </Dashboard>
      :<Redirect to={{pathname: '/login', state: {from: matchProps.location}}} />
    } />
  )
};

export default RouteLayout;
