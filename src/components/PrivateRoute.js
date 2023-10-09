// PrivateRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      // navigate to /signin
      Navigate('/signin', { state: { from: location } });
    }
  }, [isLoggedIn, location]);

  // if user is logged in, return the children components
  return isLoggedIn ? children : null;
};

export default PrivateRoute;
