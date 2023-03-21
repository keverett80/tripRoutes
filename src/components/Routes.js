import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddTrips from './pages/AddTrips';
import ViewTrips from './pages/ViewTrips';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import DriversAssign from './pages/addDriver';
import Links from './pages/links';
import Calendars from './pages/calendar';
import EditTrips from './pages/editTrips';
import Invoice from './pages/invoice';
import Archived from './pages/archived';
import DriverStatus from './pages/driverStatus';
import TripCharts from './pages/tripChart';




class SwitchRoutes extends React.Component {
  render() {
    return (
      <Routes>

        <Route path='/addTrips' element={<AddTrips/>} />
        <Route path='/viewTrips' exact element={<ViewTrips/>} />
        <Route path='/archived' element={<Archived/>} />
        <Route path='/vehicles' element={<Vehicles/>} />
        <Route path='/drivers'element={<Drivers/>} />


        <Route path='/links' element={<Links/>} />
        <Route path='/calendar' element={<Calendars/>} />
        <Route path='/editTrips' element={<EditTrips/>} />
        <Route path='/driversAssign' element={<DriversAssign/>} />

        <Route path='/invoice' element={<Invoice/>} />


        <Route path='/driverStatus' element={<DriverStatus/>} />
        <Route path='/tripCharts' element={<TripCharts/>} />



      </Routes>
    );
  }
}

export default SwitchRoutes;
