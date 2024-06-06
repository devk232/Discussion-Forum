import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ path, component: Component, render, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) return <Redirect to="/users/login" />;
        return Component ? <Component {...props} user={user} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
