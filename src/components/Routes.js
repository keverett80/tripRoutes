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
import TripReady from './pages/tripReady';
import Broker from './pages/addBrokers';
import EditCustomer from './pages/editCustomer';
import Links from './pages/links';
import Calendars from './pages/calendar';
import EditTrips from './pages/editTrips';
import Invoice from './pages/invoice';
import AllInvoices from './pages/allInvoices';
import ImportTrips from './pages/import';
import Archived from './pages/archived';
import DriverStatus from './pages/driverStatus';



class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Calendars} />
        <Route path='/addTrips' component={AddTrips} />
        <Route path='/viewTrips' component={ViewTrips} />
        <Route path='/archived' component={Archived} />
        <Route path='/vehicles' component={Vehicles} />
        <Route path='/drivers' component={Drivers} />
        <Route path='/brokers' component={Broker} />
        <Route path='/editCustomer' component={EditCustomer} />
        <Route path='/links' component={Links} />
        <Route path='/calendar' component={Calendars} />
        <Route path='/editTrips' component={EditTrips} />
        <Route path='/driversAssign' component={DriversAssign} />
        <Route path='/tripReady' component={TripReady} />
        <Route path='/invoice' component={Invoice} />
        <Route path='/allInvoices' component={AllInvoices} />
        <Route path='/import' component={ImportTrips} />
        <Route path='/driverStatus' component={DriverStatus} />

        <Route path='/dash' component={DashboardPage} />
      </Switch>
    );
  }
}

export default Routes;
