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
import EditCustomer from './pages/editCustomer';
import Links from './pages/links';
import Calendars from './pages/calendar';
import EditTrips from './pages/editTrips';
import Invoice from './pages/invoice';
import ImportTrips from './pages/import';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Calendars} />
        <Route path='/addTrips' component={AddTrips} />
        <Route path='/viewTrips' component={ViewTrips} />
        <Route path='/vehicles' component={Vehicles} />
        <Route path='/drivers' component={Drivers} />
        <Route path='/brokers' component={Broker} />
        <Route path='/editCustomer' component={EditCustomer} />
        <Route path='/links' component={Links} />
        <Route path='/calendar' component={Calendars} />
        <Route path='/editTrips' component={EditTrips} />
        <Route path='/driversAssign' component={DriversAssign} />
        <Route path='/invoice' component={Invoice} />
        <Route path='/import' component={ImportTrips} />
      </Switch>
    );
  }
}

export default Routes;
