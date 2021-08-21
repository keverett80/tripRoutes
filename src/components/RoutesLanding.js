import React from 'react';
import { Route, Switch } from 'react-router-dom';


import Logged from './pages/login'







class RoutesLanding extends React.Component {
  render() {
    return (
      <Switch>

        <Route path='/login' component={Logged} />







      </Switch>
    );
  }
}

export default RoutesLanding;