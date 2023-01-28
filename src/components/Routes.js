import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';



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


import Archived from './pages/archived';
import DriverStatus from './pages/driverStatus';




class SwitchRoutes extends React.Component {
  render() {
    return (
      <Routes>
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


        <Route path='/driverStatus' component={DriverStatus} />


        <Route path='/dash' component={DashboardPage} />
      </Routes>
    );
  }
}

export default SwitchRoutes;
