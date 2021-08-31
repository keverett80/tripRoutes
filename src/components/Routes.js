import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import TablesPage from './pages/TablesPage';
import MapsPage from './pages/MapsPage';
import NotFoundPage from './pages/NotFoundPage';
import AddTrips from './pages/AddTrips';
import ViewTrips from './pages/ViewTrips';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import DriversAssign from './pages/addDriver';
import Broker from './pages/addBrokers';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={AddTrips} />
        <Route path='/addTrips' component={AddTrips} />
        <Route path='/viewTrips' component={ViewTrips} />
        <Route path='/vehicles' component={Vehicles} />
        <Route path='/drivers' component={Drivers} />
        <Route path='/brokers' component={Broker} />
        <Route path='/driversAssign' component={DriversAssign} />
        <Route path='/404' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
