import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export const ProtectedRoute = withRouter(Protected);
