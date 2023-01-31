import React, { useState, useEffect } from 'react';
import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBSideNavLink,
  MDBSideNavCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';

import { NavLink } from 'react-router-dom';
import logo from "../assets/logo.png";
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from '@aws-amplify/auth';

export default function TopNavigation() {
  const [darkOpen, setDarkOpen] = useState(true);
  const [darkCollapse1, setDarkCollapse1] = useState(false);
  const [darkCollapse2, setDarkCollapse2] = useState(false);
  const [darkCollapse3, setDarkCollapse3] = useState(false);
  const [darkCollapse4, setDarkCollapse4] = useState(false);
  const [user, setUser] = useState('');
  const [showNavRight, setShowNavRight] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    Auth.currentUserInfo().then((userInfo) => {
      console.log(userInfo)

        setUser(userInfo.attributes.email)



    }, [])
  });

  return (
    <div className="mdb-skin">
      <MDBNavbar  dark bgColor='dark' double='true' expand="xl" fixed="top" scrolling>
      <MDBContainer fluid>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarRightAlignExample'
          aria-controls='navbarRightAlignExample'
          aria-expanded='true'
          aria-label='Toggle navigation'
          onClick={() => setShowNavRight(!showNavRight)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showNavRight}>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            <MDBNavbarItem>
            <MDBNavbarLink to="/calendar">
                  <MDBIcon icon="calendar" className="d-inline-inline" />{" "}
                  <div className="d-none d-md-inline">Calendar</div>
                </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>SignOut</MDBNavbarLink>
            </MDBNavbarItem>


          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
      <MDBSideNav
        isOpen={darkOpen}
        color='light'
        bgColor='dark'
        absolute
        logo={logo}
        getOpenState={(e) => setDarkOpen(e)}
      >
          <div className='text-center'>
          <h3 className='py-4'><img
      src={logo}

      alt='...'
    /></h3>
          <hr className='m-0' />
        </div>
        <MDBSideNavMenu>

          <MDBSideNavItem>
            <MDBSideNavLink icon='angle-down' shouldBeExpanded={darkCollapse1} onClick={() => setDarkCollapse1(!darkCollapse1)}>
              <MDBIcon fas icon='car' className='fa-fw me-3' />
              Trips
            </MDBSideNavLink>
            <MDBSideNavCollapse show={darkCollapse1}>
            <MDBSideNavLink href='/addTrips'>Add Trip</MDBSideNavLink>
                <MDBSideNavLink href='/driversAssign'>Assign Drivers</MDBSideNavLink>
                <MDBSideNavLink href='/tripReady'>Ready Pickup</MDBSideNavLink>
                <MDBSideNavLink href='/driverStatus'>Driver Status</MDBSideNavLink>
                <MDBSideNavLink href='/driverLocation'>Driver Location</MDBSideNavLink>
                <MDBSideNavLink href='/import'>Import Trips</MDBSideNavLink>
                <MDBSideNavLink href='/viewTrips'>Pending Trips</MDBSideNavLink>
                <MDBSideNavLink href='/archived'>Archived Trips</MDBSideNavLink>
            </MDBSideNavCollapse>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink icon='angle-down' shouldBeExpanded={darkCollapse2} onClick={() => setDarkCollapse2(!darkCollapse2)}>
              <MDBIcon fas icon='pencil' className='fa-fw me-3' />
              Edits
            </MDBSideNavLink>
            <MDBSideNavCollapse show={darkCollapse2}>
            <MDBSideNavLink href='/editCustomer'>Edit Customers</MDBSideNavLink>
                <MDBSideNavLink href='/editTrips'>Edit Trips</MDBSideNavLink>
            </MDBSideNavCollapse>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink icon='angle-down' shouldBeExpanded={darkCollapse3} onClick={() => setDarkCollapse3(!darkCollapse3)}>
              <MDBIcon fas icon='dollar' className='fa-fw me-3' />
              Invoices
            </MDBSideNavLink>
            <MDBSideNavCollapse show={darkCollapse3}>
            <MDBSideNavLink href='/invoice'>Invoices</MDBSideNavLink>
            </MDBSideNavCollapse>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink icon='angle-down' shouldBeExpanded={darkCollapse4} onClick={() => setDarkCollapse4(!darkCollapse4)}>
              <MDBIcon fas icon='building' className='fa-fw me-3' />
              Five G Info
            </MDBSideNavLink>
            <MDBSideNavCollapse show={darkCollapse4}>
            <MDBSideNavLink href='/drivers'>Add Drivers</MDBSideNavLink>
                <MDBSideNavLink href='/vehicles'>Add Vehicles</MDBSideNavLink>
                <MDBSideNavLink href='/brokers'>Add Brokers</MDBSideNavLink>
                <MDBSideNavLink href='/links'>Business Links</MDBSideNavLink>
                <MDBSideNavLink href='/dash'>Dashboards</MDBSideNavLink>
            </MDBSideNavCollapse>
          </MDBSideNavItem>
        </MDBSideNavMenu>
      </MDBSideNav>

      <div style={{ padding: '20px' }} className='text-center'>
        <MDBBtn onClick={() => setDarkOpen(!darkOpen)}>
          <MDBIcon fas icon='bars' />
        </MDBBtn>
      </div>
    </div>
  );
}