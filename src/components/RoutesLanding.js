import React from 'react';
import { Route, Routes } from 'react-router-dom';


import Logged from './pages/login'







class RoutesLanding extends React.Component {
  render() {
    return (
      <Routes>

        <Route path='/login' element={<Logged/>} />







      </Routes>
    );
  }
}

export default RoutesLanding;