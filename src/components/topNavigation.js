import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBSideNavLink,
  MDBSideNavCollapse,
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBNavbarToggler,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { Auth } from '@aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';
import "./pages/nav.css";

function TopNavigation({ signOut }) {
  const [darkOpen, setDarkOpen] = useState(true);
  const [darkCollapse1, setDarkCollapse1] = useState(false);
  const [darkCollapse4, setDarkCollapse4] = useState(false);
  const [showNavRight, setShowNavRight] = useState(false);
  const [showSideNav, setShowSideNav] = useState(true);
  const navRef = useRef(null);
  const handleResize = useCallback(() => {
    if (!window.matchMedia('screen and (min-width: 1000px)').matches) {
      setDarkOpen(false);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    Auth.currentUserInfo().then((userInfo) => {
      console.log(userInfo);
    }, []);
  }, []);

  useEffect(() => {
    const button = document.querySelector('#sign-out-button');
    button.addEventListener('click', handleSignOutWrapper);
    return () => button.removeEventListener('click', handleSignOutWrapper);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setDarkOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOutWrapper = () => {
    setTimeout(() => {
      handleSignOut();
    }, 200);
  };

  const handleSignOut = () => {
    window.location.href = '/';
  };
  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };


  return (
    <div className="mdb-skin">

      <MDBNavbar dark bgColor='dark' double='true' expand="lg" fixed="top" scrolling>
        <MDBContainer fluid>

          <MDBNavbarToggler
            type='button'
            data-target='#navbarRightAlignExample'
            aria-controls='navbarRightAlignExample'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setDarkOpen(!darkOpen)}
          >
            <MDBIcon icon='bars' fas onClick={toggleSideNav} />
          </MDBNavbarToggler>

            <MDBIcon icon='hand' fas onClick={toggleSideNav}/>


          <MDBCollapse navbar show={showNavRight} className="justify-content-end">
            <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>

            <MDBNavbarItem>
                <MDBNavbarLink onClick={toggleSideNav}>
                  <MDBIcon icon="hand" className="d-inline-inline" />{' '}
                  <div className="d-none d-md-inline ">Open/Close</div>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink href="/calendar">
                  <MDBIcon icon="calendar" className="d-inline-inline" />{' '}
                  <div className="d-none d-md-inline ">Calendar</div>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
              <MDBNavbarLink id="sign-out-button" onClick={signOut}>Sign Out</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <MDBSideNav
        isOpen={showSideNav}
        color='light'
        bgColor='dark'
        backdrop={false}
        mode="side"
        getOpenState={(e) => setShowSideNav(e)}
      >
            <div className='text-center'>
      <h3 className='py-4'>Five G Trips</h3>
      <hr className='m-0' />
    </div>
    <MDBSideNavMenu>
      <MDBSideNavItem>
      <MDBSideNavLink icon='angle-down' shouldBeExpanded={darkCollapse1} onClick={() => setDarkCollapse1(!darkCollapse1)}>
          <MDBIcon fas icon='car' className='fa-fw me-3' />
          Trips
        </MDBSideNavLink>
        <MDBSideNavCollapse  show={darkCollapse1}>
          <MDBSideNavLink href='/addTrips'>Add Trip</MDBSideNavLink>
          <MDBSideNavLink href='/editTrips'>Edit Trips</MDBSideNavLink>
          <MDBSideNavLink href='/viewTrips'>View All Trips</MDBSideNavLink>
          <MDBSideNavLink href='/archived'>Archived Trips</MDBSideNavLink>
          <MDBSideNavLink href='/driversAssign'>Assign Drivers</MDBSideNavLink>
          <MDBSideNavLink href='/driverStatus'>Driver Status</MDBSideNavLink>
        </MDBSideNavCollapse>
      </MDBSideNavItem>
      <MDBSideNavItem>
      <MDBSideNavLink icon='angle-down' shouldBeExpanded={darkCollapse4} onClick={() => setDarkCollapse4(!darkCollapse4)}>
          <MDBIcon fas icon='building' className='fa-fw me-3' />
          Five G Info
        </MDBSideNavLink>
        <MDBSideNavCollapse show={darkCollapse4}>
        <MDBSideNavLink href='/employeePay'>EmployeePay</MDBSideNavLink>
          <MDBSideNavLink href='/tripCharts'>Daily Trips</MDBSideNavLink>
          <MDBSideNavLink href='/invoice'>Invoices</MDBSideNavLink>
          <MDBSideNavLink href='/drivers'>Add Drivers</MDBSideNavLink>
          <MDBSideNavLink href='/vehicles'>Add Vehicles</MDBSideNavLink>
          <MDBSideNavLink href='/links'>Business Links</MDBSideNavLink>
        </MDBSideNavCollapse>
      </MDBSideNavItem>
    </MDBSideNavMenu>
      </MDBSideNav>
    </div>
  );
}

export default withAuthenticator(TopNavigation);
